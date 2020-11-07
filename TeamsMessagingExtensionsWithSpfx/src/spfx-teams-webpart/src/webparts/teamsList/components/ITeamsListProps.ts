import { IMicrosoftTeams } from "@microsoft/sp-webpart-base";

export interface ITeamsListProps {
  isTeamsMessagingExtension?: boolean;
  teamsContext?: IMicrosoftTeams;
}
