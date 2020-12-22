import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal } from '@ionic/react';
import { planetOutline } from 'ionicons/icons';
import IPlanet from '../types/IPlanet';

const PlanetListItem: React.FC<IPlanet> = ({ name, diameter, population }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <IonItem>
      <IonIcon icon={planetOutline} slot="start"></IonIcon>
      <IonLabel>
        <h2>{name}</h2>
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
              <h1>Population: {population}</h1>
            </IonItem>
            <IonItem>
              <h1>Diameter: {diameter}</h1>
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

export default PlanetListItem;
