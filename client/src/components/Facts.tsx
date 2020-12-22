import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    IonNote
} from '@ionic/react';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import IFacts from '../types/IFacts';
import Modal from './Modal';
import Fact from './Fact';

const Facts: React.FC = () => {
    const [facts, setFacts] = useState<IFacts[]>();

    useEffect(() => {
        const getFacts = async () => {
            const facts = await axios.get<IFacts[]>("http://localhost:3000/fun_fact");
            setFacts(facts.data);
        };
        getFacts();
    }, []);

    const showFacts = () => {
        if (facts) {
            return (
                <IonContent>
                    {
                        facts.map(f => {
                            return (<Fact key={f.id} title={`Fact #${f.id}`} flavorText={f.flavor_text}>
                                <Modal title={`Fact #${f.id}`} button="View Data">
                                    <IonList>
                                        {f.data.map((d, index) =>
                                            <IonItem key={index}>
                                                <IonLabel>{d.data_key}</IonLabel>
                                                <IonNote slot="end" color="primary">{d.data_value}</IonNote>
                                            </IonItem>
                                        )}
                                    </IonList>
                                </Modal>
                            </Fact>);
                        })
                    }
                </IonContent>
            );
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle style={{ letterSpacing: "3px" }}>FUN FACTS</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {showFacts()}
            </IonContent>
        </IonPage>
    );
};

export default Facts;