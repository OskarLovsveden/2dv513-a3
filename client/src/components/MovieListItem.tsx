import React from 'react';
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { filmOutline } from 'ionicons/icons';
import IMovie from '../types/IMovie';


const MovieListItem: React.FC<IMovie> = ({ name, id, release_date }) => {
  return (
    <IonItem>
      <IonIcon icon={filmOutline} slot="start" color="primary"></IonIcon>
      <IonLabel color="secondary">
        <h2>Episode {id} - {name}</h2>
        <h3>{release_date}</h3>
      </IonLabel>
    </IonItem>
  );
};

export default MovieListItem;
