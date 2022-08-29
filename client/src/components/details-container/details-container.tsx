import React, { useEffect, useState } from 'react';
import { Wrapper } from '../../containers';
import { Details, MovieCard } from '../../components';
import { useSearchParams } from "react-router-dom";
import { movieService } from '../../services/movie.service';
import { IMovie, TSortListItem } from '../../types/types';

export function DetailsContainer(): JSX.Element {
    const [ searchParams ] = useSearchParams();
    const [ movieWithDetails, setMovieWithDetails ] = useState(null);
    const [ movies, setMovies ] = useState([]);

    useEffect(() => {
        movieService.getMovieById(searchParams.get('id'))
            .then(setMovieWithDetails);
        movieService.getMovies({
            genreId: JSON.parse(searchParams.get('genreId')),
            sortFieldUI: (searchParams.get('sortFieldUI') as TSortListItem),
            limit: 3,
        }).then(data => { 
            console.log(data);
            setMovies(data.movies);
        });
    }, [searchParams]);

    const moviesCards: JSX.Element[] = movies
        .map((movie: IMovie) => {
            return <li
                className="result__movies-card"
                key={movie._id}>
                <MovieCard movie={movie}/>
            </li>;
        });

    return <div className='main'>
        <Wrapper>
            <>
                { movieWithDetails && <Details { ...movieWithDetails }/> }
                <div className="result__separator" />
                { moviesCards?.length &&
                    <div className="result__content">
                        <div>Similar movies: </div>
                        <ul className="result__movies__cards-list">
                            {moviesCards}
                        </ul>
                    </div> || null }
            </>
        </Wrapper>
    </div>;
}