import React, { useEffect, useState } from 'react';
import { IonAvatar, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import './Characters.css';

import axios from 'axios';

const Characters: React.FC = () => {
  interface character {
    birth_planet: string,
    name: string,
    species: string;
  }

  const [people, setPeople] = useState<character[]>();

  useEffect(() => {
    const getPeople = async () => {
      const users = await axios.get<character[]>("http://localhost:3000/people");
      setPeople(users.data);
    };
    getPeople();
  }, []);

  const showPeople = () => {
    if (people) {
      return (
        <IonList>
          {people.map((p, index) => (
            <IonItem key={index}>
              <IonAvatar slot="start">
                <img style={{ borderRadius: 0 }} src={personCircleOutline} alt="a thing"></img>
              </IonAvatar>
              <IonLabel>
                <h2>{p.name}</h2>
                <h3>{p.species}</h3>
                <h3>{p.birth_planet}</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      );
    }
  };

  showPeople();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Characters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {showPeople()}
      </IonContent>
    </IonPage>
  );
};

export default Characters;
