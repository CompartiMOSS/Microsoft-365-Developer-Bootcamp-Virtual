import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TeamsListWebPartStrings';
import TeamsList from './components/TeamsList';
import { ITeamsListProps } from './components/ITeamsListProps';

import { initializeIcons } from 'office-ui-fabric-react';
import { graph } from '@pnp/graph';

export interface ITeamsListWebPartProps {
  description: string;
}

export default class TeamsListWebPart extends BaseClientSideWebPart<ITeamsListWebPartProps> {

  private isTeamsMessagingExtension: boolean;

  public onInit(): Promise<void> {

    initializeIcons();

    this.isTeamsMessagingExtension = (this.context as any)._host &&
                                      (this.context as any)._host._teamsManager &&
                                      (this.context as any)._host._teamsManager._appContext &&
                                      (this.context as any)._host._teamsManager._appContext.applicationName &&
                                      (this.context as any)._host._teamsManager._appContext.applicationName === 'TeamsTaskModuleApplication';

    console.log("isTeamsMessagingExtension", this.isTeamsMessagingExtension);

    return super.onInit().then(_ => {
      graph.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<ITeamsListProps> = React.createElement(
      TeamsList,
      {
        teamsContext: this.context.sdks.microsoftTeams,
        isTeamsMessagingExtension: this.isTeamsMessagingExtension
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
