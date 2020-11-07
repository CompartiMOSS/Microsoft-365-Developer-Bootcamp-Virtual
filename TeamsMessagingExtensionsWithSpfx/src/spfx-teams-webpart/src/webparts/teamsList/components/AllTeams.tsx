import * as React from 'react';
import styles from './TeamsList.module.scss';

import { IGraphTeam } from "../../../models/IGraphTeam";
import TeamDetail from './TeamDetail';
import { IMicrosoftTeams } from '@microsoft/sp-webpart-base';

export interface IAllTeamsProps {
  teams: IGraphTeam[];
  isTeamsMessagingExtension?: boolean;
  teamsContext?: IMicrosoftTeams;
}

export interface IAllTeamsState {}

export default class AllTeams extends React.Component<IAllTeamsProps, IAllTeamsState> {
  public render(): React.ReactElement<IAllTeamsProps> {

    const teams = this.props.teams.map(team => {
      return <TeamDetail
        group={team}
        isTeamsMessagingExtension={this.props.isTeamsMessagingExtension}
        teamsContext={this.props.teamsContext} />;
    });

    return (
      <div className={styles.teamsList}>
        <div className={styles.cards}>
          {teams}
        </div>
      </div>
    );
  }
}
