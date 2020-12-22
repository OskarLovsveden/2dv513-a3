import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const NotFound: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle style={{ letterSpacing: "3px" }}>Not Found</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonText>404</IonText>
            </IonContent>
        </IonPage>
    );
};

export default NotFound;
