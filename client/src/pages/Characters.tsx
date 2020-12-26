import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

import CharacterList from '../components/CharacterList';

const Characters: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ letterSpacing: "3px" }}>CHARACTERS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <CharacterList></CharacterList>
      </IonContent>
    </IonPage>

  );
};

export default Characters;
