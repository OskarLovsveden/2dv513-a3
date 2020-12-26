import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ letterSpacing: "3px" }}>HOME</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonText color="secondary">
          <h1>Hello and Welcome to the <IonText color="danger">Star Wars FC </IonText>APP</h1>
        </IonText>
        <IonText color="light">
          <h3>In this app you will find information about the Star Wars universe and its different characters</h3>
          <h3>The information is gathered from different members of the Star Wars FC oraganisation</h3>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Home;
