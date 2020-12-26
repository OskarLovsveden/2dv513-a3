import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import React from 'react';
import PlanetList from '../components/PlanetList';

const Planets: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ letterSpacing: "3px" }}>PLANETS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <PlanetList></PlanetList>
      </IonContent>
    </IonPage>
  );
};

export default Planets;
