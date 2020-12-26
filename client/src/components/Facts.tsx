import { IonContent, IonItem, IonLabel, IonList, IonNote } from '@ionic/react';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import IFacts from '../types/IFacts';
import Modal from './Modal';
import Fact from './Fact';

const Facts: React.FC = () => {
    const [facts, setFacts] = useState<IFacts[]>();

    useEffect(() => {
        const getFacts = async () => {
            const f = await axios.get<IFacts[]>("http://localhost:3000/fun_fact");
            setFacts(f.data);
        };
        getFacts();
    }, []);

    return facts
        ? <IonContent>
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
        : <></>;
};

export default Facts;