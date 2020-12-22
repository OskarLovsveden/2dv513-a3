import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal } from '@ionic/react';
import { transgenderOutline } from 'ionicons/icons';
import ISpecies from '../types/ISpecies';


const SpeciesListItem: React.FC<ISpecies> = ({ name, classification, home_planet }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <IonItem>
      <IonIcon icon={transgenderOutline} slot="start"></IonIcon>
      <IonLabel>
        <h2>{name}</h2>
        <h3></h3>
        <h3></h3>
      </IonLabel>
      <IonContent>
      <IonModal isOpen={showModal} cssClass='my-custom-class'>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {name}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          <IonList>
            <IonItem>
              <h1>Classification - {classification}</h1>
            </IonItem>
            <IonItem>
              <h1>Indigenous to - {home_planet}</h1>
            </IonItem>
          </IonList>
          </IonCardContent>
        </IonCard>
        <IonButton size="small" color="medium" onClick={() => setShowModal(false)}>Close</IonButton>
      </IonModal>
      <IonButton color="light" onClick={() => setShowModal(true)}>More info</IonButton>
      </IonContent>
    </IonItem>
  );
};

export default SpeciesListItem;
