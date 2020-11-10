import * as React from 'react';
import styles from './dashboard.module.scss';

interface IDashboardProps {
   saints: number;
   bronzeSaints: number;
   silverSaints: number;
   goldSaints: number;
   legendarySaints: number;
   strengthAvg: number;
 }
 
export const Dashboard = (props: IDashboardProps) => {
   return (
     <div className={styles.dashboard}>
       <div className={styles.kpiRow}>
         <div className={styles.kpiPanel}>
           <div className={styles.kpiTitle}>Saints:</div><div className={styles.kpiValue}>{props.saints}</div>
         </div>
         <div className={styles.kpiPanel}>
           <div className={styles.kpiTitle}>Strength average:</div><div className={styles.kpiValue}>{props.strengthAvg}</div>
           </div>
       </div>
       <div className={styles.kpiRow}>
         <div className={styles.kpiPanel}>
           <div className={styles.kpiTitle}>Bronze Saints:</div><div className={styles.kpiValue}>{props.bronzeSaints}</div>
         </div>
         <div className={styles.kpiPanel}>
           <div className={styles.kpiTitle}>Silver Saints:</div><div className={styles.kpiValue}>{props.silverSaints}</div>
         </div>
         <div className={styles.kpiPanel}>
           <div className={styles.kpiTitle}>Gold Saints:</div><div className={styles.kpiValue}>{props.goldSaints}</div>
         </div>
         <div className={styles.kpiPanel}>
           <div className={styles.kpiTitle}>Legendary Saints:</div><div className={styles.kpiValue}>{props.legendarySaints}</div>
         </div>
       </div>
     </div>
   );
 };
 