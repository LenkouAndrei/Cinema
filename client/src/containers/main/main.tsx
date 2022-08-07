import React, { MouseEvent, useCallback, useEffect, useState, ChangeEvent } from 'react';
import { FormPage, Modal, Wrapper } from '../';
import { DeleteModal, Details, MovieCard, ResultFilter, ResultSort, Search, Pagination } from '../../components';
import {
    IMovie,
    ISelectConfig,
    IGenresListItem,
    TNullable,
    TSortListItem
} from '../../types/types';
import './main.scss';
import { moviesSortList } from './mockMoviesSortList';
import { movieService } from '../../services/movie.service';
import { genresService } from '../../services/genres.service';

const defaultMovies: IMovie[] = require('../../data.json');
const blockName = 'result';
let searchText = '';

interface IMainProps {
    movieToAdd: TNullable<IMovie>;
    areDetailsVisible: boolean;
    onChangePage: () => void;
}

type TVoidWithNoArgs = () => void;
type TShowModal = (modalType: string) => void;
type TSetGenre = (genre: IGenresListItem) => void;
type TUpdateMovieSet = (editableMovie: IMovie) => void;
type TUpdateMoviesSortConfig = (isOpen: boolean, title?: TSortListItem) => void;
type TSortMoviesByField = (field: keyof IMovie) => void;

const defaultGenre: IGenresListItem = {
    name: 'All',
    id: null
};

let moviesAmt = 0;
let pageNum = 1;
const limitPerPage = 5;

export function Main(props: IMainProps): JSX.Element {
    useEffect(() => {
        genresService.getGenres()
            .then(responseGenres => {
                const genres: IGenresListItem[] = [defaultGenre, ...responseGenres];
                setMoviesGenresConfig({
                    genres,
                    currentGenre: genres[0]
                })
            })
    }, []);


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
    const [ movies, setMovies ] = useState([]);
    const [ moviesGenresConfig, setMoviesGenresConfig ] = useState({
        genres: [defaultGenre],
        currentGenre: defaultGenre
    });
    const [ greatestId, setGreatestId ] = useState(initGreatestId);
    const [ movieWithDetails, setMovieWithDetails ] = useState(null);

    const setMoviesData = ({ movies, moviesAmount }: { movies: IMovie[], moviesAmount: number }) => {
        setMovies(movies);
        moviesAmt = moviesAmount;
    }

    useEffect(() => {
        movieService.getMovies({
            genreId: moviesGenresConfig.currentGenre.id,
            sortFieldUI: moviesSortConfig.chosenOption,
            searchText,
            limit: limitPerPage,
        }).then(setMoviesData);
    }, [moviesGenresConfig.currentGenre, moviesSortConfig.chosenOption]);

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

    const handlePaginationClick = (pageIdx: number) => {
        pageNum = pageIdx;
        movieService.getMovies({
            genreId: moviesGenresConfig.currentGenre.id,
            sortFieldUI: moviesSortConfig.chosenOption,
            searchText,
            limit: limitPerPage,
            skip: pageNum
        }).then(setMoviesData);
    };

    const showModal: TShowModal = (modalType: string) => {
        setIsFormDialogOpen(modalType === 'Edit');
        setIsDeleteDialogOpen(modalType === 'Delete');
    };

    const hideModal: TVoidWithNoArgs = () => {
        setIsFormDialogOpen(false);
        setIsDeleteDialogOpen(false);
    };

    const handleMovieToEditChange = (movieId: string) => (modalDialogType: string) => {
        movieService.getMovieById(movieId)
            .then(setMovieToEdit)
            .then(() => showModal(modalDialogType));
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
        movieService.updateMovie(editableMovie)
            .then(updatedMovie => {
                setMovieToEdit(updatedMovie);
                return updatedMovie;
            })
            .then((updatedMovie) => {
                const updatedMovieIdx = movies.findIndex(movie => movie._id === updatedMovie._id);
                movies[updatedMovieIdx] = updatedMovie;
                setMovies(movies);
            })
            .then(() => hideModal());
    };

    const setCurrentGenre: TSetGenre = useCallback(
      (genre: IGenresListItem) => {
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

    const showDetails = (movie: IMovie) => (event: MouseEvent) => {
        movieService.getMovieById(movie._id)
            .then(setMovieWithDetails);
        props.onChangePage();
    };

    const findByText = (inputEl: HTMLInputElement) => {
        return (_event: MouseEvent) => {
            searchText = inputEl.value;
            movieService.getMovies({
                genreId: moviesGenresConfig.currentGenre.id,
                sortFieldUI: moviesSortConfig.chosenOption,
                searchText,
                limit: limitPerPage,
            }).then(setMoviesData);
        }
    }

    const changeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
        searchText = event.target.value;
        console.log(searchText);
    }

    const { currentGenre } = moviesGenresConfig;
    const moviesCards: JSX.Element[] = movies
        .filter((movie: IMovie) =>  {
            const currentGenreName = currentGenre.name;
            return currentGenreName === 'All' || movie.genres.includes(currentGenreName)
        }).map((movie: IMovie) => {
            return <li
                className={`${blockName}__movies-card`}
                key={movie.id}
                onClick={showDetails(movie)}>
                <MovieCard onClickMovie={handleMovieToEditChange(movie._id)} movie={movie}/>
            </li>;
        });

    return <main className={blockName}>
        <Modal isOpen={isFormDialogOpen} handleClose={hideModal}>
            <FormPage onSaveChanges={updateMoviesSet} movie={ movieToEdit }/>
        </Modal>
        <Modal isOpen={isDeleteDialogOpen} handleClose={hideModal}>
            <DeleteModal onDeleteConfirm={deleteMovie} title={movieToEdit.title}/>
        </Modal>
        <Wrapper>
            { props.areDetailsVisible && movieWithDetails ?
                <Details { ...movieWithDetails }/>
                : <Search handleSearch={findByText} handleSearchTextChange={changeSearchText}/> }
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
                    <strong className='strong'>{moviesAmt}</strong> movies found
                </div>
                <ul className={`${blockName}__cards-list`}>
                    {moviesCards}
                </ul>
                <Pagination
                    onPageChange={handlePaginationClick}
                    totalCount={moviesAmt}
                    pageSize={limitPerPage}
                    siblingCount={1}
                    currentPage={pageNum}/>
            </>
        </Wrapper>
    </main>;
}