import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonModal } from '@ionic/react';
import IModal from '../types/IModal';

const Modal: React.FC<IModal> = ({ children, title, button }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <IonModal isOpen={showModal}>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>{title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>{children}</IonCardContent>
                </IonCard>
                <IonButton fill="outline" size="small" onClick={() => setShowModal(false)}>Close</IonButton>
            </IonModal >
            <IonButton fill="outline" onClick={() => setShowModal(true)}>{button}</IonButton>
        </>
    );
};

export default Modal;