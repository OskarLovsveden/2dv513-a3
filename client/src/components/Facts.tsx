import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonModal,
    IonText,
    IonNote
} from '@ionic/react';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import IFacts from '../types/IFacts';
import FactModal from './Modal';

const Facts: React.FC = () => {
    const [facts, setFacts] = useState<IFacts>();

    useEffect(() => {
        const getFacts = async () => {
            const facts = await axios.get<IFacts>("http://localhost:3000/fun_fact");
            setFacts(facts.data);
        };
        getFacts();
    }, []);

    const showFacts = () => {
        if (facts) {
            const { naboolian_appearances, species_appearances_counted } = facts;

            return (
                <IonContent>
                    {/* Fact Start */}
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                Fun Fact #1
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonText>
                                <h2>
                                    The planet with the most characters born on it is Naboo. Click below to see how many movies these characters appears in.
                                </h2>
                            </IonText>
                            <FactModal title="test1" button="start this shit">
                                <IonList>
                                    <IonItem>
                                        <IonLabel>Name:</IonLabel>
                                        <IonNote slot="end">Movies:</IonNote>
                                    </IonItem>
                                    {naboolian_appearances.map((n, index) =>
                                        <IonItem key={index}>
                                            <IonLabel>{n.name}</IonLabel>
                                            <IonNote slot="end" color="primary">{n.movie_appearances}</IonNote>
                                        </IonItem>
                                    )}
                                </IonList>
                            </FactModal>
                        </IonCardContent >
                    </IonCard >
                    {/* Fact End */}
                    {/* Fact Start */}
                    {/* <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                Fun Fact #2
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonText>
                                <h2>
                                    ?
                                </h2>
                            </IonText> */}
                    {/* Modal Start */}
                    {/* <IonModal isOpen={showFactTwoModal}>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Fun Fact #2
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonList>
                                            <IonItem>
                                                <IonLabel>?:</IonLabel>
                                                <IonNote slot="end">?:</IonNote>
                                            </IonItem>
                                            {species_appearances_counted.map((s, index) =>
                                                <IonItem key={index}>
                                                    <IonLabel>{s.species}</IonLabel>
                                                    <IonNote slot="end" color="primary">{s.character_amount}</IonNote>
                                                </IonItem>
                                            )}
                                        </IonList>
                                    </IonCardContent>
                                </IonCard>
                                <IonButton size="small" color="danger" onClick={() => setShowFactTwoModal(false)}>Close</IonButton>
                            </IonModal> */}
                    {/* Modal End */}
                    {/* <IonButton color="dark" onClick={() => setShowFactTwoModal(true)}>?</IonButton>
                        </IonCardContent>
                    </IonCard> */}
                    {/* Fact End */}
                </IonContent>
            );
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Fun Facts</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {showFacts()}
            </IonContent>
        </IonPage>
    );
};

export default Facts;