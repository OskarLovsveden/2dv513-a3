import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import PlanetListItem from './PlanetListItem';
import IPlanet from '../types/IPlanet';

import axios from 'axios';

const PlanetsList: React.FC = () => {
    const [planets, setPlanets] = useState<IPlanet[]>();

    useEffect(() => {
        const getPlanets = async () => {
            const planets = await axios.get<IPlanet[]>("http://localhost:3000/planet");
            setPlanets(planets.data);
        };
        getPlanets();
    }, []);

    const showPlanets = () => {
        if (planets) {
            return (
                <IonList>
                    {planets.map((p, index) =>
                        <PlanetListItem key={index} name={p.name} diameter={p.diameter} population={p.population}></PlanetListItem>
                    )}
                </IonList>
            );
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Planets</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {showPlanets()}
            </IonContent>
        </IonPage>
    );
};

export default PlanetsList;
