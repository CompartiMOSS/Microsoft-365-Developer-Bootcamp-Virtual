import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'CoolWebPartWebPartStrings';
import CoolWebPart from './components/CoolWebPart';
import { ICoolWebPartProps } from './components/ICoolWebPartProps';

export interface ICoolWebPartWebPartProps {
  title: string;
  description: string;
  viewMode: string;
}

export default class CoolWebPartWebPart extends BaseClientSideWebPart<ICoolWebPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICoolWebPartProps > = React.createElement(
      CoolWebPart,
      {
        title: this.properties.title,
        description: this.properties.description,
        viewMode: this.properties.viewMode
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
            description: strings.PropertyPaneSettings
          },
          groups: [
            {
              groupName: strings.PropertiesGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: strings.AdvancedGroupName,
              groupFields: [ 
                PropertyPaneDropdown('viewMode', {
                  label: strings.ViewModeFieldLabel,
                  options: [
                    {key: 'GALLERY', text: 'Gallery'},
                    {key: 'LIST', text: 'List'}
                  ],
                  selectedKey: 'LIST'
                }),
              ]
            },
          ]
        }
      ]
    };
  }
}
