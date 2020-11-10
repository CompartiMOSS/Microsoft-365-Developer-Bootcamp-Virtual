using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.AI.QnA;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Schema;
using MultiturnQnABot.Dialogs;

namespace MultiturnQnABot.Bots
{
    public class Bot<T> : ActivityHandler where T : Microsoft.Bot.Builder.Dialogs.Dialog
    {
        protected readonly Dialog _dialog;
        private readonly ConversationState _conversationState;

        public Bot(ConversationState conversationState, T dialog)
        {
            _conversationState = conversationState;
            _dialog = dialog;
        }

public override async Task OnTurnAsync(ITurnContext turnContext, CancellationToken cancellationToken = default)
{
    await base.OnTurnAsync(turnContext, cancellationToken);

    // Save any state changes that might have occurred during the turn.
    await _conversationState.SaveChangesAsync(turnContext, false, cancellationToken);
}

        protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
        {
            await _dialog.RunAsync(turnContext, _conversationState.CreateProperty<DialogState>(nameof(DialogState)), cancellationToken);
        }

        protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
        {
            foreach (var member in membersAdded)
            {
                if (member.Id != turnContext.Activity.Recipient.Id)
                {
                    await turnContext.SendActivityAsync(MessageFactory.Text($"Welcome Microsoft 365 Dev Bootcamp!"), cancellationToken);
                }
            }
        }

    }
}
