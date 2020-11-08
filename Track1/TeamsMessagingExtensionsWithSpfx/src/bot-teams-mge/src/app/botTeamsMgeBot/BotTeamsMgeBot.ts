import { BotDeclaration, PreventIframe } from "express-msteams-host";
import * as debug from "debug";
import { DialogSet, DialogState } from "botbuilder-dialogs";
import { StatePropertyAccessor, CardFactory, TurnContext, MemoryStorage, ConversationState, ActivityTypes, TeamsActivityHandler, MessagingExtensionAction, MessagingExtensionActionResponse, CardAction, ActionTypes } from "botbuilder";
import HelpDialog from "./dialogs/HelpDialog";
import WelcomeCard from "./dialogs/WelcomeDialog";

import { graph } from "@pnp/graph-commonjs";
import { MsalFetchClient } from "@pnp/nodejs-commonjs";

// Initialize debug logging module
const log = debug("msteams");

/**
 * Implementation for bot teams mge Bot
 */
@BotDeclaration(
    "/api/messages",
    new MemoryStorage(),
    process.env.MICROSOFT_APP_ID,
    process.env.MICROSOFT_APP_PASSWORD)
@PreventIframe("/botTeamsMgeBot/aboutBot.html")
export class BotTeamsMgeBot extends TeamsActivityHandler {
    private readonly conversationState: ConversationState;
    private readonly dialogs: DialogSet;
    private dialogState: StatePropertyAccessor<DialogState>;

    /**
     * The constructor
     * @param conversationState
     */
    public constructor(conversationState: ConversationState) {
        super();

        this.conversationState = conversationState;
        this.dialogState = conversationState.createProperty("dialogState");
        this.dialogs = new DialogSet(this.dialogState);
        this.dialogs.add(new HelpDialog("help"));

        // Set up the Activity processing

        this.onMessage(async (context: TurnContext): Promise<void> => {
            // TODO: add your own bot logic in here
            switch (context.activity.type) {
                case ActivityTypes.Message:
                    let text = TurnContext.removeRecipientMention(context.activity);
                    text = text.toLowerCase();
                    if (text.startsWith("hello")) {
                        await context.sendActivity("Oh, hello to you as well!");
                        return;
                    } else if (text.startsWith("help")) {
                        const dc = await this.dialogs.createContext(context);
                        await dc.beginDialog("help");
                    } else {
                        await context.sendActivity(`I\'m terribly sorry, but my developer hasn\'t trained me to do anything yet...`);
                    }
                    break;
                default:
                    break;
            }
            // Save state changes
            return this.conversationState.saveChanges(context);
        });

        this.onConversationUpdate(async (context: TurnContext): Promise<void> => {
            if (context.activity.membersAdded && context.activity.membersAdded.length !== 0) {
                for (const idx in context.activity.membersAdded) {
                    if (context.activity.membersAdded[idx].id === context.activity.recipient.id) {
                        const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
                        await context.sendActivity({ attachments: [welcomeCard] });
                    }
                }
            }
        });

        this.onMessageReaction(async (context: TurnContext): Promise<void> => {
            const added = context.activity.reactionsAdded;
            if (added && added[0]) {
                await context.sendActivity({
                    textFormat: "xml",
                    text: `That was an interesting reaction (<b>${added[0].type}</b>)`
                });
            }
        });

        graph.setup({
            graph: {
                fetchClientFactory: () => {
                    return new MsalFetchClient({
                        auth: {
                            authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
                            clientId: process.env.GRAPH_APP_ID || '',
                            clientSecret: process.env.GRAPH_APP_SECRET,
                        }
                    });
                },
            },
        });
   }

   protected async handleTeamsMessagingExtensionSubmitAction(context: TurnContext, action: MessagingExtensionAction): Promise<MessagingExtensionActionResponse> {
    const group: any = action.data;

    const team = await graph.teams.getById(group.id)();
    console.log(team);

    const cardAction: CardAction = {
        type: ActionTypes.OpenUrl,
        title: "Jump to Team",
        value: team.webUrl
    };

    const groupCard = CardFactory.heroCard(group.displayName, group.description, [group.thumbnailUrl], [cardAction], undefined);

    const response: MessagingExtensionActionResponse = {
        composeExtension: {
            type: 'result',
            attachmentLayout: 'list',
            attachments: [groupCard]
        }
    }

    return Promise.resolve(response);
}

}
