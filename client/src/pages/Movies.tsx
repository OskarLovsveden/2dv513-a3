import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import MovieList from '../components/MovieList';

const Movies: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ letterSpacing: "3px" }}>MOVIES</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <MovieList></MovieList>
      </IonContent>
    </IonPage>
  );
};

export default Movies;
