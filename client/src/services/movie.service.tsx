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
    private readonly moviesUrl = (postfix = '') => `http://localhost:5000/api/movies${postfix}`;
    private readonly genresUrl = 'http://localhost:5000/api/genres';
    public getMovies({
            skip = 0,
            limit = 5,
            sortFieldUI = 'release date',
            sortOrder = 1,
            genreId = null,
            searchText = ''
        }: Partial<IMovieRequest>) {
        const sortField = sortFieldUI.split(' ').join('_');
        return axios.get(this.moviesUrl(), {
            params: { skip, limit, sortField, sortOrder, genreId, searchText }
        }).then((res) => res.data);
    }

    public getMovieById(movieId: string) {
        return axios.get(this.moviesUrl(`/${movieId}`), { params: { id: movieId } })
            .then((res) => res.data);
    }


    public getGenres() {
        return fetch(this.genresUrl)
            .then((res) => res.json());
    }
}

const movieService = new MovieService();
export { movieService };