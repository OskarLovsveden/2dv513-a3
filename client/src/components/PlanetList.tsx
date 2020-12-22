import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import PlanetListItem from './PlanetListItem';
import IPlanet from '../types/IPlanet';

import axios from 'axios';

const PlanetsList: React.FC = () => {
    const [planets, setPlanets] = useState<IPlanet[]>();
    const [search, setSearchText] = useState<string>('');

    useEffect(() => {
        const getPlanets = async () => {
            const planets = await axios.get<IPlanet[]>("http://localhost:3000/planet");
            setPlanets(planets.data);
        };
        getPlanets();
    }, []);

    const showPlanets = () => {
        if (planets) {
            if (search !== null) {
                return filteredPlanets();
            }
            return (
                <IonList>
                    {planets.map((p, index) =>
                        <PlanetListItem key={index} name={p.name} diameter={p.diameter} population={p.population}></PlanetListItem>
                    )}
                </IonList>
            );
        }
    };

    const filteredPlanets = () => {
        const filteredPlanets = planets?.filter(p => {
            if (search == null) {
                return p;
            } else {
                return p.name.toLowerCase().includes(search.toLowerCase());
            }
        });

        return (
            <IonList>
                <IonList>
                    {filteredPlanets?.map((p, index) =>
                        <PlanetListItem key={index} name={p.name} diameter={p.diameter} population={p.population}></PlanetListItem>
                    )}
                </IonList>
            </IonList>
        );
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle style={{ letterSpacing: "3px" }}>PLANETS</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonSearchbar value={search} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
                {showPlanets()}
            </IonContent>
        </IonPage>
    );
};

export default PlanetsList;
