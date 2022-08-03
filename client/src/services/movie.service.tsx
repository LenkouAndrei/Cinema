export class MovieService {
    public getMovies() {
        return fetch('http://localhost:5000/api/movies')
            .then((res) => res.json());
    }
    public getGenres() {
        return fetch('http://localhost:5000/api/genres')
            .then((res) => res.json());
    }
}

const movieService = new MovieService();
export { movieService };