import React from 'react';

import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonText
} from '@ionic/react';

import IFact from '../types/IFact';

const Fact: React.FC<IFact> = ({ children, title, flavorText }) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonText><h2>{flavorText}</h2></IonText>
                {children}
            </IonCardContent >
        </IonCard >
    );
};

export default Fact;