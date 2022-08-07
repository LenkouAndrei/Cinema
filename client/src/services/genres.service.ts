import axios from 'axios';

interface IResponseGenre {
    name: string;
    _id: string;
}

export class GenresService {
    private readonly genresUrl = 'http://localhost:5000/api/genres';
    public getGenres() {
        return axios.get(this.genresUrl)
            .then((res) => {
                return [...res.data.map(({ name, _id }: IResponseGenre) => ({ name, id: _id }))];
            });
    }
}

const genresService = new GenresService();
export { genresService };