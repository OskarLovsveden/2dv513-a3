import React from 'react';
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { planetOutline } from 'ionicons/icons';
import IPlanet from '../types/IPlanet';

const PlanetListItem: React.FC<IPlanet> = ({ name, diameter, population }) => {
  return (
    <IonItem>
      <IonIcon icon={planetOutline} slot="start"></IonIcon>
      <IonLabel>
        <h2>{name}</h2>
        <h3>Population: {population}</h3>
        <h3>Diameter: {diameter}</h3>
      </IonLabel>
    </IonItem>
  );
};

export default PlanetListItem;
