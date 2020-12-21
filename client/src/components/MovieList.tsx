import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MovieListItem from './MovieListItem';

import IMovie from '../types/IMovie'


import axios from 'axios';
const MovieList: React.FC = () => {
    const [movie, setPeople] = useState<IMovie[]>();

    useEffect(() => {
        const getMovie = async () => {
            const movies = await axios.get<IMovie[]>("http://localhost:3000/movie");
            setPeople(movies.data);
        };
        getMovie();
    }, []);

    const showMovie = () => {
        if (movie) {
            return (
                <IonList>
                    {movie.map(m =>
                        <MovieListItem key={m.id} id={m.id} name={m.name} release_date={m.release_date}></MovieListItem>
                    )}
                </IonList>
            );
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Movies</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
               {showMovie()}
            </IonContent>
        </IonPage>
    );
};

export default MovieList;
