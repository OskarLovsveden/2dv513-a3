import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import axios from 'axios';
import ISpecies from '../types/ISpecies';
import SpeciesListItem from './SpeciesListItem';


const SpeciesList: React.FC = () => {
    const [species, setPeople] = useState<ISpecies[]>();

    useEffect(() => {
        const getPeople = async () => {
            const species = await axios.get<ISpecies[]>("http://localhost:3000/species");
            setPeople(species.data);
        };
        getPeople();
    }, []);

    const showSpecies = () => {
        if (species) {
            return (
                <IonList>
                    {species.map((s, index) =>
                        <SpeciesListItem 
                        key={index} 
                        name={s.name} 
                        classification={s.classification} 
                        home_planet={s.home_planet}>
                        </SpeciesListItem>
                    )}
                </IonList>
            );
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Species</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {showSpecies()}
            </IonContent>
        </IonPage>
    );
};

export default SpeciesList;
