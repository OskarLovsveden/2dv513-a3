import React from 'react';
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import ICharacter from '../types/ICharacter';
import Modal from './Modal';

const CharacterListItem: React.FC<ICharacter> = ({ name, species, birth_planet, appearsIn }) => {

  return (
    <IonItem>
      <IonIcon icon={personCircleOutline} slot="start" color="primary"></IonIcon>
      <IonLabel color="secondary">
        <h2>{name}</h2>
      </IonLabel>
      <Modal title={name} button="More Info">
        <IonList>
          <IonItem>
            <h1>Species - {species}</h1>
          </IonItem>
          <IonItem>
            <h1>Birth Planet - {birth_planet}</h1>
          </IonItem>
          <IonItem>
            <h1>Apppear In</h1>
          </IonItem>
          <IonItem>
            <IonList>
              {appearsIn.map(a => (<IonItem key={a.episode}>Episode {a.episode} - {a.movie}</IonItem>))}
            </IonList>
          </IonItem>
        </IonList>
      </Modal>
    </IonItem>
  );
};

export default CharacterListItem;
