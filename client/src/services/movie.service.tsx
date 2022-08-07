import axios from 'axios';
import { TNullable, TSortListItem, IMovie } from '../types/types';

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

    public updateMovie(movie: IMovie) {
        const movieId = movie._id;
        return axios.patch(
            this.moviesUrl(`/${movieId}`),
            {
                params: { id: movieId },
                movieWithUpdates: movie,
            })
            .then((res) => res.data)
    }

    public addMovie(movie: IMovie) {
        return axios.post(this.moviesUrl(), movie)
            .then((res) => res.data);
    }
}

const movieService = new MovieService();
export { movieService };