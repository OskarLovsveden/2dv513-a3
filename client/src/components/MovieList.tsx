import React, { useEffect, useState } from 'react';
import { IonList } from '@ionic/react';
import MovieListItem from './MovieListItem';

import IMovie from '../types/IMovie';

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


    return movie
        ? <IonList>
            {movie.map(m =>
                <MovieListItem key={m.id} id={m.id} name={m.name} release_date={m.release_date}></MovieListItem>
            )}
        </IonList>
        : <></>;

};

export default MovieList;
