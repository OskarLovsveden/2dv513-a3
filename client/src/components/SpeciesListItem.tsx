import React from 'react';
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { transgenderOutline } from 'ionicons/icons';
import ISpecies from '../types/ISpecies';
import Modal from './Modal';

const SpeciesListItem: React.FC<ISpecies> = ({ name, classification, home_planet }) => {

  return (
    <IonItem>
      <IonIcon icon={transgenderOutline} slot="start" color="primary"></IonIcon>
      <IonLabel color="secondary">
        <h2>{name}</h2>
      </IonLabel>
      <Modal title={name} button="More info">
        <IonList>
          <IonItem>
            <h1>Classification - {classification}</h1>
          </IonItem>
          <IonItem>
            <h1>Indigenous to - {home_planet}</h1>
          </IonItem>
        </IonList>
      </Modal>
    </IonItem>
  );
};

export default SpeciesListItem;
