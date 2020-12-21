import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import CharacterListItem from './CharacterListItem';

import axios from 'axios';

interface character {
    birth_planet: string,
    name: string,
    species: string;
}

const CharacterList: React.FC = () => {
    const [people, setPeople] = useState<character[]>();

    useEffect(() => {
        // const getPeople = async () => {
        //     const users = await axios.get<character[]>("http://localhost:3000/people");
        //     setPeople(users.data);
        // };
        // getPeople();
    }, []);

    // const showPeople = () => {
    //     if (people) {
    //         return (
    //             <IonList>
    //                 {people.map((p, index) =>
    //                     <CharacterListItem index={index} name={p.name} species={p.species} planet={p.birth_planet}></CharacterListItem>
    //                 )}
    //             </IonList>
    //         );
    //     }
    // };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Characters</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                movie hej
            </IonContent>
        </IonPage>
    );
};

export default CharacterList;
