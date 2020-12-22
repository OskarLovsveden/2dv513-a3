import { IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Home: React.FC = () => {
  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Home</IonTitle>
            </IonToolbar>
        <IonText color="primary" style={{margin: "20px"}}>
            <h1>Eyy sup you stupid neerds. This is our cool app with awesome stuff and FACTS! Fun FACTS!</h1>
        </IonText>
        </IonHeader>
    </IonPage>
  );
};

export default Home;
