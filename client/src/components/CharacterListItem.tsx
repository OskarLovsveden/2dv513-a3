import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import ICharacter from '../types/ICharacter';

const CharacterListItem: React.FC<ICharacter> = ({ name, species, birth_planet, appearsIn }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <IonItem>
      <IonIcon icon={personCircleOutline} slot="start" color="primary"></IonIcon>
      <IonLabel color="secondary">
        <h2>{name}</h2>
      </IonLabel>
      <IonContent>
<<<<<<< HEAD
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
                  <h1>Species - {species}</h1>
                </IonItem>
                <IonItem>
                  <h1>Birth Planet - {birth_planet}</h1>
                </IonItem>
                <IonItem>
                  <h1>Apppear In</h1>
                </IonItem>
                <IonItem>
                  <IonList>
                    {appearsIn.map(a => (<IonItem key={a.episode}>Episode {a.episode} - {a.movie}</IonItem>))}
                  </IonList>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
          <IonButton size="small" color="medium" onClick={() => setShowModal(false)}>Close</IonButton>
        </IonModal>
        <IonButton color="light" onClick={() => setShowModal(true)}>More info</IonButton>
      </IonContent>
=======
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
              <h1>Species - {species}</h1>
            </IonItem>
            <IonItem>
              <h1>Birth Planet - {birth_planet}</h1>
            </IonItem>
            <IonItem>
              <h1>Apppear In</h1>
            </IonItem>
            <IonItem>
            <IonList>
              { appearsIn.map(a => (<IonItem key={a.episode}>Episode {a.episode} - {a.movie}</IonItem>)) }
            </IonList>
            </IonItem>
          </IonList>
          </IonCardContent>
        </IonCard>
        <IonButton fill="outline" size="small" onClick={() => setShowModal(false)}>Close</IonButton>
      </IonModal>
      <IonButton fill="outline" onClick={() => setShowModal(true)} class="ion-float-right">More info</IonButton>
    </IonContent>
>>>>>>> bd07c7ca93374a76729c62fab5c62c5d5f4cc211
    </IonItem>
  );
};

export default CharacterListItem;
