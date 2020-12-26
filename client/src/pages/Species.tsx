import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import React from 'react';
import SpeciesList from '../components/SpeciesList';

const Species: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ letterSpacing: "3px" }}>SPECIES</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <SpeciesList></SpeciesList>
      </IonContent>
    </IonPage>
  );
};

export default Species;
