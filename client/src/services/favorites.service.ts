import axios from 'axios';

export class FavoritesService {
    private readonly userId: string;

    constructor() {
        this.userId = sessionStorage.getItem('userId');
    }

    private readonly favoritesUrl = (postfix = '') => `http://localhost:5000/api/favorites${postfix}`;

    public getFavorites() {
        return axios.get(this.favoritesUrl(), { params: { userId: this.userId } })
            .then((favoriteList) => {
                console.log(favoriteList);
            })
    }

    public addFavorite({ movieId, comments }: { movieId: string, comments: { id: string, data: string }[]}) {
        console.log('11111111111 userId: ', this.userId);
        return axios.post(this.favoritesUrl(), { favoriteWithUpdates: { userId: this.userId, movieId, comments } })
            .then((favoriteList) => {
                console.log(favoriteList);
            })
    }

    public getFavoriteById(movieId: string) {
        return axios.get(this.favoritesUrl(`/${this.userId}`), { params: { userId: this.userId, movieId } })
            .then((favoriteList) => {
                console.log(favoriteList);
            })
    }

    public updateFavorite(favorite: any) {
        const movieId = favorite.movieId;
        return axios.patch(
            this.favoritesUrl(`/${this.userId}`),
            {
                params: { userId: this.userId, movieId },
                favoriteWithUpdates: favorite,
            })
            .then((res) => res.data)
    }

    public deleteFavorite(movieId: string) {
        return axios.delete(this.favoritesUrl(`/${this.userId}`), { params: { userId: this.userId, movieId } })
            .then((res) => res.data);
    }
}

const favoritesService = new FavoritesService();
export { favoritesService };