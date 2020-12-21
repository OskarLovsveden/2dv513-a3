import React from 'react';
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { transgenderOutline } from 'ionicons/icons';
import ISpecies from '../types/ISpecies';


const SpeciesListItem: React.FC<ISpecies> = ({ name, classification, home_planet }) => {
  return (
    <IonItem>
      <IonIcon icon={transgenderOutline} slot="start"></IonIcon>
      <IonLabel>
        <h2>{name}</h2>
        <h3>Classification - {classification}</h3>
        <h3>Indigenous to - {home_planet}</h3>
      </IonLabel>
    </IonItem>
  );
};

export default SpeciesListItem;
