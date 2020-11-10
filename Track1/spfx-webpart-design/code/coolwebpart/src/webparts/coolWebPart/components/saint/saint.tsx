import * as React from 'react';
import styles from './../CoolWebPart.module.scss';
import { ISaintProps, ISaints, ISaint, saintsList } from '../../../model/ISaints';
import { Rating, RatingSize, IRatingStyles } from 'office-ui-fabric-react/lib/Rating';

export const Saint = (props: ISaint, key: number) => {
  let strengthColor = "#b08d57";
  if (props.saint.class === 'Silver') {
    strengthColor = "#374f6b";
  } else if (props.saint.class === 'Gold') {
    strengthColor = "#d4af37";
  } else if (props.saint.class === 'Legendary') {
    strengthColor = "#2e1733";
  }

  return (
    <>
      <li key={key} className="saint-container" style={{ backgroundImage: `url(${props.saint.picture})` }}>
        <div className={styles.saintPicture} style={{ backgroundImage: `url(${props.saint.picture})` }}></div>
        <div className={styles.saintName}>{props.saint.name}</div>
        <div className="saint-constellation">{props.saint.constellation !== '' ? props.saint.constellation : '-' }</div>
        <div className="saint-class">{props.saint.class}</div>
        <div className="saint-strength"><span className={styles.galleryOnly}>Strength: </span>{props.saint.strength}</div>
        <Rating
            min={1}
            max={5}
            size={RatingSize.Large}
            rating={props.saint.strength / 4.5}
            readOnly={true}
            ariaLabelFormat={'{0} of {1} strength level'}
            styles={{ratingStarFront: {color: strengthColor}, ratingStarBack: {color: "#f0f0f0"}}}
          />
      </li>
    </>
  );
};

 