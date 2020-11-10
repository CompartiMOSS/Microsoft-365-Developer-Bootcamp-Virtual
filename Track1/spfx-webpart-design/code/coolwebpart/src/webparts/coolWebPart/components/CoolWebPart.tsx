import * as React from 'react';
import styles from './CoolWebPart.module.scss';
import { ICoolWebPartProps } from './ICoolWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ISaintProps, ISaints, ISaint, saintsList } from '../../model/ISaints';
import { Rating, RatingSize, IRatingStyles } from 'office-ui-fabric-react/lib/Rating';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { SaintList } from './saint/saintList';
import { Filter } from './filters/filter';
import { Dashboard } from './dashboard/dashboard';

function getAverage(saints: ISaintProps[]) {
  let sum = 0;
  let avg = 0;

  saints.forEach(item => {
    sum += item.strength;
  });

  avg = Math.round((sum / saints.length) * 100) / 100;
  
  return avg;
}

interface ICoolWebPartState {
  saintsFiltered: ISaintProps[];
  styleViewMode: string;
  viewMode: string;
}

export default class CoolWebPart extends React.Component<ICoolWebPartProps, ICoolWebPartState> {
  constructor(props) {
    super(props);
    this.state = { 
      saintsFiltered: saintsList.saints, 
      styleViewMode: this.props.viewMode === 'GALLERY' ? styles.GALLERY : styles.LIST,
      viewMode: this.props.viewMode === 'GALLERY' ? styles.GALLERY : styles.LIST      
    };
    this.FilterSaints = this.FilterSaints.bind(this);
    this.setViewMode = this.setViewMode.bind(this);
  }

  public FilterSaints(key: string) {
    if (key === 'All') {
      this.setState(() => {  
        return { saintsFiltered: saintsList.saints };  
      });
    } else {
      this.setState(() => {  
        return { saintsFiltered: saintsList.saints.filter((saint) => { return saint.class === key;}) };  
      });
    }
  }

  private setViewMode(newViewMode: string) {
    this.setState({
      viewMode: newViewMode,
      styleViewMode: newViewMode === 'GALLERY' ? styles.GALLERY : styles.LIST
    });
  }

  public render(): React.ReactElement<ICoolWebPartProps> {
    const styleViewMode = this.props.viewMode === 'GALLERY' ? styles.GALLERY : styles.LIST;
    const average = 0;

    const _farItems: ICommandBarItemProps[] = [
      {
        key: 'tile',
        text: 'Grid view',
        // This needs an ariaLabel since it's icon-only
        ariaLabel: 'Grid view',
        iconOnly: true,
        iconProps: { iconName: 'Tiles' },
        onClick: () => {
          console.log('Tiles'); 
          console.log(this.state.viewMode);
          if (this.state.viewMode === 'GALLERY') {
            this.setViewMode('LIST');
          } else { 
            this.setViewMode('GALLERY');
          }
        },
      },
      {
        key: 'info',
        text: 'Info',
        // This needs an ariaLabel since it's icon-only
        ariaLabel: 'Info',
        iconOnly: true,
        iconProps: { iconName: 'Info' },
        onClick: () => console.log('Info'),
      },
    ];
    const overflowProps: IButtonProps = { ariaLabel: 'More commands' };

    return (
      <>
        {/* <div className={[styles.saintsContainer, this.state.styleViewMode].join(' ')}>
          <CommandBar
            items={[]}
            overflowItems={[]}
            overflowButtonProps={overflowProps}
            farItems={_farItems}
            ariaLabel="Use left and right arrow keys to navigate between commands"
          />
          <Dashboard 
            saints={this.state.saintsFiltered.length}
            bronzeSaints={6}
            silverSaints={6}
            goldSaints={12}
            legendarySaints={6}
            strengthAvg={getAverage(this.state.saintsFiltered)}
          /> */}
          <Filter saints={this.state.saintsFiltered} handleFilter={this.FilterSaints} /> 
          <SaintList saints={this.state.saintsFiltered} viewMode={this.state.viewMode}/>
        {/* </div> */}
      </>
    );
  }
}
