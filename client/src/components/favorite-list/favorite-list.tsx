import React, { useEffect, useState } from 'react';
import { FavoriteItem, IFavoriteMovie } from './favourite-item';
import { favoritesService } from '../../services/favorites.service';

export function FavoriteList(): JSX.Element {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        favoritesService.getFavorites()
            .then(setFavoriteMovies);
    }, []);

    const favoriteListItems = favoriteMovies.map((favoriteMovie: IFavoriteMovie) => {
        return <li key={favoriteMovie.movie._id}>
            <FavoriteItem favoriteMovie={favoriteMovie}/>
        </li>;
    });

    return <ul>{favoriteListItems}</ul>;
}