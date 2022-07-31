import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { FormPage, Modal, Wrapper } from '../';
import { DeleteModal, Details, MovieCard, ResultFilter, ResultSort, Search } from '../../components';
import {
    IMovie,
    ISelectConfig,
    TGenresListItem,
    TNullable,
    TSortListItem
} from '../../types/types';
import './main.scss';
import { moviesSortList } from './mockMoviesSortList';

const defaultMovies: IMovie[] = require('../../data.json');
const blockName = 'result';

interface IMainProps {
    movieToAdd: TNullable<IMovie>;
    areDetailsVisible: boolean;
    onChangePage: () => void;
}

type TVoidWithNoArgs = () => void;
type TShowModal = (modalType: string) => void;
type THandleMovie = (modalDialogType: string, id: number) => void;
type TSetGenre = (genre: TGenresListItem) => void;
type TUpdateMovieSet = (editableMovie: IMovie) => void;
type TUpdateMoviesSortConfig = (isOpen: boolean, title?: TSortListItem) => void;
type TSortMoviesByField = (field: keyof IMovie) => void;
type TShowDetails = (event: MouseEvent, movieWithDetails: IMovie) => void;

export function Main(props: IMainProps): JSX.Element {
    const allMoviesGenres: TGenresListItem[] =
        defaultMovies.reduce(
            (allGenres: TGenresListItem[], { genres }: IMovie) => {
                allGenres.push(...genres as TGenresListItem[]);
                return allGenres;
            },
            ['All']
        );

    const moviesGenres: TGenresListItem[] = Array.from(new Set(allMoviesGenres));
    const initGreatestId: number = defaultMovies.reduce(
        (accum: number, curr: IMovie) => {
            return curr.id > accum ? curr.id : accum;
        },
        0
    );

    if ( props.movieToAdd ) {
        defaultMovies.push(props.movieToAdd);
    }

    const [ isFormDialogOpen, setIsFormDialogOpen ] = useState(false);
    const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState(false);
    const [ movieToEdit, setMovieToEdit ] = useState(defaultMovies[0]);
    const [ moviesSortConfig, setMoviesSortConfig ] = useState({
        showOptionList: false,
        options: moviesSortList,
        chosenOption: moviesSortList[0],
    });
    const [ movies, setMovies ] = useState(defaultMovies);
    const [ moviesGenresConfig, setMoviesGenresConfig ] = useState({
        genres: moviesGenres,
        currentGenre: moviesGenres[0],
    });
    const [ greatestId, setGreatestId ] = useState(initGreatestId);
    const [ movieWithDetails, setMovieWithDetails ] = useState(null);

    useEffect(
        () => {
            if (!props.movieToAdd) {
                return;
            }
            const currentId: number = greatestId + 1;
            props.movieToAdd.id = currentId;
            setMovies([ ...movies, props.movieToAdd]);
            setGreatestId(currentId);
        },
        [props.movieToAdd]
    );

    const showModal: TShowModal = (modalType: string) => {
        setIsFormDialogOpen(modalType === 'Edit');
        setIsDeleteDialogOpen(modalType === 'Delete');
    };

    const hideModal: TVoidWithNoArgs = () => {
        setIsFormDialogOpen(false);
        setIsDeleteDialogOpen(false);
    };

    const handleMovieToEditChange: THandleMovie = (modalDialogType: string, id: number) => {
        setMovieToEdit(movies.find((movie: IMovie) => movie.id === id));
        showModal(modalDialogType);
    };

    const sortMoviesByField: TSortMoviesByField = (field: keyof IMovie) => {
        const moviesCopy: IMovie[] = [ ...movies ];
        if (field === 'release_date') {
            moviesCopy.sort((movieA, movieB) => +new Date(movieA[field]) - +new Date(movieB[field]));
        } else {
            moviesCopy.sort((movieA, movieB) => (movieA[field] as number) - (movieB[field] as number));
        }
        setMovies( moviesCopy );
    };

    const updateMoviesSortConfig: TUpdateMoviesSortConfig = (isOpen: boolean, title?: TSortListItem) => {
        const newSortConfig: Partial<ISelectConfig> = {
            showOptionList: isOpen,
            chosenOption: title,
        };
        setMoviesSortConfig({ ...moviesSortConfig, ...newSortConfig });
        if (title) {
            sortMoviesByField(title.replace(' ', '_') as keyof IMovie);
        }
    };

    const updateMoviesSet: TUpdateMovieSet = (editableMovie: IMovie) => {
        const movieIdx: number = movies
            .findIndex(({ id }: IMovie) => id === movieToEdit.id);
        const newMovies: IMovie[] = [ ...movies ];
        newMovies.splice(movieIdx, 1, editableMovie);
        setMovies( newMovies );
        hideModal();
    };

    const setCurrentGenre: TSetGenre = useCallback(
      (genre: TGenresListItem) => {
        setMoviesGenresConfig({
            ...moviesGenresConfig,
            currentGenre: genre,
        });
      },
      [moviesGenresConfig]
    );

    const deleteMovie: TVoidWithNoArgs = () => {
        const movieIdx: number = movies
            .findIndex(({ id }: IMovie) => id === movieToEdit.id);
        const newMovies: IMovie[] = [ ...movies ];
        newMovies.splice(movieIdx, 1);
        setMovies( newMovies );
        hideModal();
    };

    const showDetails: TShowDetails = (event: MouseEvent, movie: IMovie) => {
        setMovieWithDetails( movie );
        props.onChangePage();
    };

    const { currentGenre } = moviesGenresConfig;
    const moviesCards: JSX.Element[] = movies.filter((movie: IMovie) =>  (
            currentGenre === 'All' || movie.genres.includes(currentGenre))
        ).map((movie: IMovie) => {
            return <li
                className={`${blockName}__movies-card`}
                key={movie.id}
                onClick={(event) => showDetails(event, movie)}>
                <MovieCard onClickMovie={handleMovieToEditChange} movie={movie}/>
            </li>;
        });

    return <main className={blockName}>
        <Modal isOpen={isFormDialogOpen} handleClose={hideModal}>
            <FormPage onSaveChanges={updateMoviesSet} movie={ movieToEdit }/>
        </Modal>
        <Modal isOpen={isDeleteDialogOpen} handleClose={hideModal}>
            <DeleteModal  onDeleteConfirm={deleteMovie} title={movieToEdit.title}/>
        </Modal>
        <Wrapper>
            { props.areDetailsVisible && movieWithDetails ?
                <Details { ...movieWithDetails }/> : <Search/> }
        </Wrapper>
        <div className={`${blockName}__separator`} />
        <Wrapper>
            <>
                <section className={`${blockName}__filter`}>
                    <ResultFilter
                        onGenreClick={setCurrentGenre}
                        { ...moviesGenresConfig }/>
                    <ResultSort
                        onSortClick={updateMoviesSortConfig}
                        {...moviesSortConfig}/>
                </section>
                <div className={`${blockName}__amount`}>
                    <strong className='strong'>{movies.length}</strong> movies found
                </div>
                <ul className={`${blockName}__cards-list`}>
                    {moviesCards}
                </ul>
            </>
        </Wrapper>
    </main>;
}