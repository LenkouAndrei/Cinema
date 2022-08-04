import axios from 'axios';
import { TNullable, TSortListItem } from '../types/types';

interface IMovieRequest {
    skip: number;
    limit: number;
    sortFieldUI: TSortListItem;
    sortOrder: number;
    genreId: TNullable<string>;
    searchText: string;
}
export class MovieService {
    public getMovies({
            skip = 0,
            limit = 5,
            sortFieldUI = 'release date',
            sortOrder = 1,
            genreId = null,
            searchText = ''
        }: Partial<IMovieRequest>) {
        const sortField = sortFieldUI.split(' ').join('_');
        return axios.get('http://localhost:5000/api/movies', {
            params: { skip, limit, sortField, sortOrder, genreId, searchText }
        }).then((res) => res.data);
    }
    public getGenres() {
        return fetch('http://localhost:5000/api/genres')
            .then((res) => res.json());
    }
}

const movieService = new MovieService();
export { movieService };