import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Facts: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Fun Facts</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                Factz
            </IonContent>
        </IonPage>
    );
};

export default Facts;