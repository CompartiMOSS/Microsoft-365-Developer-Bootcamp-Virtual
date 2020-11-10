import * as React from 'react';
import styles from '../CoolWebPart.module.scss';
import { ISaintProps, ISaints, ISaint, saintsList } from '../../../model/ISaints';
import { Saint } from './saint';

interface IListProps {
   viewMode: string;
   saints: ISaintProps[];
 }
 
export const SaintList =  (props: IListProps) => {
   const styleViewMode = props.viewMode === 'GALLERY' ? styles.GALLERY : styles.LIST;
 
   return (
     <>
       <ul className={styleViewMode}>
         <li key={-1} className={[styles.listOnly, styles.listHeader].join(' ')}>
           <div></div>
           <div>Saint</div>
           <div>Constellation</div>
           <div>Class</div>
           <div>Strength</div>
           <div></div>
         </li>
 
         {props.saints.map((item, index) => {
           return (<Saint saint={item} key={index} />);
         })}
       </ul>
     </>
   );
 };
 