import React from 'react';
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import character from '../types/ICharacter';

const CharacterListItem: React.FC<character> = ({ name, species, birth_planet }) => {
  return (
    <IonItem>
      <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
      <IonLabel>
        <h2>{name}</h2>
        <h3>{species}</h3>
        <h3>{birth_planet}</h3>
      </IonLabel>
    </IonItem>
  );
};

export default CharacterListItem;
