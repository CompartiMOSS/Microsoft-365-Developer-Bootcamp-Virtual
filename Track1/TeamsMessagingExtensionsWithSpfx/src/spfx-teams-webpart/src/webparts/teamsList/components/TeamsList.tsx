import * as React from "react";
import styles from "./TeamsList.module.scss";
import { ITeamsListProps } from "./ITeamsListProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { ITeamsListState } from "./ITeamsListState";
import { IGraphTeam } from "../../../models/IGraphTeam";
import { graph } from "@pnp/graph/presets/all";
import { Shimmer } from "office-ui-fabric-react/lib/components/Shimmer/Shimmer";
import { ShimmerElementType } from "office-ui-fabric-react/lib/components/Shimmer";
import AllTeams from "./AllTeams";

export default class TeamsList extends React.Component<
  ITeamsListProps,
  ITeamsListState
> {
  constructor(props: ITeamsListProps) {
    super(props);

    this.state = {
      teams: [],
    };
  }

  public componentDidMount(): void {
    graph.groups
      .setEndpoint("beta")
      .top(20)
      .select("id, displayName, description")
      .filter("resourceProvisioningOptions/Any(x:x eq 'Team')") // only Teams: https://docs.microsoft.com/en-us/graph/teams-list-all-teams#get-a-list-of-groups-using-beta-apis
      .get()
      .then((teams) => {
        this.setState({
          teams: teams.map((team: IGraphTeam, index: number) => {
            index += 10;
            return {
              displayName: team.displayName,
              id: team.id,
              description: team.description,
              thumbnailUrl: `https://picsum.photos/id/${index}/200/100`,
            };
          }),
        });
      });
  }

  public render(): React.ReactElement<ITeamsListProps> {
    if(this.state.teams.length <= 0) {
      return(
        <Shimmer
          shimmerElements={[
            { type: ShimmerElementType.line, width: 246, height: 246 },
            { type: ShimmerElementType.gap, width: '2%' },
            { type: ShimmerElementType.line, width: 246, height: 246 },
            { type: ShimmerElementType.gap, width: '2%' },
            { type: ShimmerElementType.line, width: 246, height: 246 },
            { type: ShimmerElementType.gap, width: '2%' },
            { type: ShimmerElementType.line, width: '100%', height: 246 }
          ]}
        />
      );
    }

    return (
      <AllTeams
        teams={this.state.teams}
        isTeamsMessagingExtension={this.props.isTeamsMessagingExtension}
        teamsContext={this.props.teamsContext} />
    );
  }
}
