import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import React from 'react';

import Facts from '../components/Facts';

const FunFacts: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ letterSpacing: "3px" }}>FUN FACTS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Facts></Facts>
      </IonContent>
    </IonPage>
  );
};

export default FunFacts;
