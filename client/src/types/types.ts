export type TNullable<T> = T | null;

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
}

export interface IMovie extends IMovieInfo {
    id?: number;
}

export interface ISelectConfig {
    showOptionList: boolean;
    options: TSortListItem[];
    chosenOption: TSortListItem;
}

export type TSortListItem = 'vote average' | 'vote count' | 'release date' | 'revenue';

export type TGenresListItem = keyof IMovie | 'All';

export interface IMoviesGenresConfig {
    genres: TGenresListItem[];
    currentGenre: TGenresListItem;
}