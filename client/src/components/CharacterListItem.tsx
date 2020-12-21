import React from 'react';
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';

interface props {
  index: number,
  name: string,
  species: string,
  planet: string;
}

const CharacterListItem: React.FC<props> = ({ index, name, species, planet }) => {
  return (
    <IonItem key={index}>
      <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
      <IonLabel>
        <h2>{name}</h2>
        <h3>{species}</h3>
        <h3>{planet}</h3>
      </IonLabel>
    </IonItem>
  );
};

export default CharacterListItem;
