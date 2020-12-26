import { IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
        <IonText color="secondary" style={{ margin: "20px" }}>
          <h1>Hello and Welcome to the <IonText color="danger">Star Wars FC </IonText>APP</h1>
        </IonText>
        <IonText color="dark">
          <h3>In this app you will find information about the Star Wars universe and its different characters</h3>
          <h3>The information is gathered from different members of the Star Wars FC oraganisation</h3>
        </IonText>
      </IonHeader>
    </IonPage>
  );
};

export default Home;
