import * as React from 'react';
import styles from '../CoolWebPart.module.scss';
import { ISaintProps, ISaints, ISaint, saintsList } from '../../../model/ISaints';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

interface IFilterProps {
   saints: ISaintProps[];
   handleFilter: (key:string) => any;
 }
 
 export const Filter = (props: IFilterProps) => {
   const options: IDropdownOption[] = [
     { key: 'All', text: 'All Saints' },
     { key: 'Bronze', text: 'Bronze' },
     { key: 'Silver', text: 'Silver' },
     { key: 'Gold', text: 'Gold' },
     { key: 'Legendary', text: 'Legendary' }
   ];
   const dropdownStyles: Partial<IDropdownStyles> = {
     dropdown: { width: 300 },
   };
 
   function onSelectClass (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) {
     if (option != null) {
       props.handleFilter(option.key.toString());
     }
   }
 
   return (
     <>
       <Dropdown
         placeholder="All Saints"
         defaultSelectedKeys={["All"]}
         label="Filter Saints"
         options={options}
         styles={dropdownStyles}
         onChange={onSelectClass} />
     </>
   );
 };
 