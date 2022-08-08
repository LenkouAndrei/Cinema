export type TNullable<T> = T | null;

export interface IRateMpAAUIView {
    name: string;
    ageLimit: number;
}
export interface IMovieInfo {
    title: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    poster_path: string;
    overview: string;
    budget: number;
    revenue: number;
    genres: string[];
    runtime: number;
    countries: string[];
    producers: string[];
    rateMpAA: IRateMpAAUIView | string;
}

export interface IMovie extends IMovieInfo {
    id?: number;
    _id?: string;
}

export interface ISelectConfig {
    showOptionList: boolean;
    options: TSortListItem[];
    chosenOption: TSortListItem;
}

export type TSortListItem = 'vote average' | 'vote count' | 'release date' | 'revenue';

export type IGenresListItem = {
    name: keyof IMovie | 'All',
    id: TNullable<string>;
};

export interface IMoviesGenresConfig {
    genres: IGenresListItem[];
    currentGenre: IGenresListItem;
}

export interface ICredentials {
    email: TNullable<string>;
    password: TNullable<string>;
}