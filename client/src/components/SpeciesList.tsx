import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';

import axios from 'axios';
import ISpecies from '../types/ISpecies';
import SpeciesListItem from './SpeciesListItem';

const SpeciesList: React.FC = () => {
    const [species, setPeople] = useState<ISpecies[]>();
    const [search, setSearchText] = useState<string>('');

    useEffect(() => {
        const getPeople = async () => {
            const species = await axios.get<ISpecies[]>("http://localhost:3000/species");
            setPeople(species.data);
        };
        getPeople();
    }, []);

    const showSpecies = () => {
        if (species) {
            if (search !== null) {
                return filteredSpecies();
            }
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

    const filteredSpecies = () => {
        const filteredSpecies = species?.filter(p => {
            if (search == null) {
                return p;
            } else {
                return p.name.toLowerCase().includes(search.toLowerCase());
            }
        });

        return (
            <IonList>
                {filteredSpecies?.map((s, index) =>
                    <SpeciesListItem
                        key={index}
                        name={s.name}
                        classification={s.classification}
                        home_planet={s.home_planet}>
                    </SpeciesListItem>
                )}
            </IonList>
        );
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle style={{ letterSpacing: "3px" }}>SPECIES</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonSearchbar value={search} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
                {showSpecies()}
            </IonContent>
        </IonPage>
    );
};

export default SpeciesList;
