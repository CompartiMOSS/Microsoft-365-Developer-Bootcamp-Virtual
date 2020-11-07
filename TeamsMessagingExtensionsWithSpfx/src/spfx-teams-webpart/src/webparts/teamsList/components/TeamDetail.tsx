import * as React from 'react';

import styles from './TeamsList.module.scss';
import { IGraphTeam } from '../../../models/IGraphTeam';
import { IIconProps } from 'office-ui-fabric-react/lib/components/Icon/Icon.types';
import { ActionButton } from 'office-ui-fabric-react/lib/components/Button/ActionButton/ActionButton';
import { IMicrosoftTeams } from '@microsoft/sp-webpart-base';

export interface IGroupDetailProps {
  group: IGraphTeam;
  isTeamsMessagingExtension?: boolean;
  teamsContext?: IMicrosoftTeams;
}

export interface IGroupDetailState {}

export default class GroupDetail extends React.Component<IGroupDetailProps, IGroupDetailState> {

  private groupClicked = (group: IGraphTeam): void => {
    console.log("About to share group info", group);
    if (this.props.isTeamsMessagingExtension) {
      this.props.teamsContext.teamsJs.tasks.submitTask(group);
    }
  }

  public render(): React.ReactElement<IGroupDetailProps> {

    const shareIcon: IIconProps = { iconName: 'Share' };

    return (
      <div className={styles.card}>
        <img className={styles.image} src={this.props.group.thumbnailUrl} alt="Group img"></img>
        <div className={styles.container}>
          <h4><b>{this.props.group.displayName}</b></h4>
          <p>{this.props.group.description}</p>
          <div>
          <ActionButton
            iconProps={shareIcon}
            key={this.props.group.id}
            onClick={() => this.groupClicked(this.props.group)}>Share Team</ActionButton>
          </div>
        </div>
      </div>
    );
  }
}
