import React from 'react';
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { planetOutline } from 'ionicons/icons';
import IPlanet from '../types/IPlanet';
import Modal from './Modal';

const PlanetListItem: React.FC<IPlanet> = ({ name, diameter, population }) => {

  return (
    <IonItem>
      <IonIcon icon={planetOutline} color="primary" slot="start"></IonIcon>
      <IonLabel color="secondary">
        <h2>{name}</h2>
      </IonLabel>
      <Modal title={name} button="More info">
        <IonList>
          <IonItem>
            <h1>Population: {population}</h1>
          </IonItem>
          <IonItem>
            <h1>Diameter: {diameter}</h1>
          </IonItem>
        </IonList>
      </Modal>
    </IonItem>
  );
};

export default PlanetListItem;
