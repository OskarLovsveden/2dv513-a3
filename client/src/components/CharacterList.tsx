import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import CharacterListItem from './CharacterListItem';


import axios from 'axios';
import ICharacter from '../types/ICharacter';

const CharacterList: React.FC = () => {
    const [people, setPeople] = useState<ICharacter[]>();
    const [search, setSearchText] = useState<string>('');

    useEffect(() => {
        const getPeople = async () => {
            const users = await axios.get<ICharacter[]>("http://localhost:3000/people");
            setPeople(users.data);
        };
        getPeople();
    }, []);

    const showPeople = () => {
        if (people) {
            if (search !== null) {
                return filteredPeople();
            }
            return (
                <IonList>
                    {people.map((p, index) =>
                        <CharacterListItem
                            key={index}
                            name={p.name}
                            species={p.species}
                            birth_planet={p.birth_planet}
                            appearsIn={p.appearsIn}
                        >
                        </CharacterListItem>
                    )}
                </IonList>
            );
        }
    };


    const filteredPeople = () => {
        const filteredPeople = people?.filter(p => {
            if (search == null) {
                return p;
            } else {
                return p.name.toLowerCase().includes(search.toLowerCase());
            }
        });

        return (
            <IonList>
                {filteredPeople?.map((p, index) =>
                    <CharacterListItem
                        key={index}
                        name={p.name}
                        species={p.species}
                        birth_planet={p.birth_planet}
                        appearsIn={p.appearsIn}
                    >
                    </CharacterListItem>
                )}
            </IonList>
        );
    };



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Characters</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonSearchbar value={search} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
                {showPeople()}
            </IonContent>
        </IonPage>
    );
};

export default CharacterList;
