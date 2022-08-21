import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormSelect } from '../../components';
import { IMovie, IGenresListItem, IRateMpAAUIView } from '../../types/types';
import './form-page.scss';
import { defaultMovie } from './mockDefaultMovie';
import { genresService } from '../../services/genres.service';
import { countriesService } from '../../services/countries.service';
import { producersService } from '../../services/producers.service';
import { rateMpAAService } from '../../services/ratesMpAA.service';

interface ISaveChanges {
    movie: IMovie;
    onSaveChanges: (editableMovie: IMovie) => void;
}

type THandleSubmit = (event: FormEvent) => void;
type THandleChange = (event: ChangeEvent<HTMLInputElement>) => void;
type TUpdateGenres = (newGenres: string[]) => void;
type TResetState = () => void;

const blockName = 'form';

const url = '';
let availableGenres: IGenresListItem[];
let availableCountries: IGenresListItem[];
let availableProducers: IGenresListItem[];
let availableRatesMpAA: IGenresListItem[];

export function FormPage({ movie, onSaveChanges }: ISaveChanges): JSX.Element {
    const initialState: IMovie = movie && { ...defaultMovie, ...movie} || defaultMovie;
    const [ movieInfo, setMovieInfo ] = useState(null);

    const toIdFormat = (genres: IGenresListItem[]) => (genreName: string) => {
        return genres.find(({ name }) => name === genreName)?.id || '';
    };

    useEffect(() => {
        Promise.all([
            genresService.getGenres(),
            countriesService.getCountries(),
            producersService.getProducers(),
            rateMpAAService.getRatesMpAA()
        ])
        .then(([genres, countries, producers, ratesMpAA]) => {
            availableGenres = genres;
            availableCountries = countries;
            availableProducers = producers;
            availableRatesMpAA = ratesMpAA;
            initialState.genres = initialState.genres.map(toIdFormat(genres));
            initialState.countries = initialState.countries.map(toIdFormat(countries));
            initialState.producers = initialState.producers.map(toIdFormat(producers));
            initialState.rateMpAA = toIdFormat(ratesMpAA)((initialState.rateMpAA as IRateMpAAUIView).name);
            return initialState;
        })
        .then(setMovieInfo);
    }, []);

    const handleChange: THandleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        if (name === 'url') {
            return;
        }

        setMovieInfo({ ...movieInfo, [name]: value });
    };

    const updateGenres: TUpdateGenres = (newGenres: string[]) => {
        setMovieInfo({ ...movieInfo, genres: newGenres });
    };

    const updateCountries: TUpdateGenres = (newCountries: string[]) => {
        setMovieInfo({ ...movieInfo, countries: newCountries });
    };

    const updateProducers: TUpdateGenres = (newProducers: string[]) => {
        setMovieInfo({ ...movieInfo, producers: newProducers });
    };

    const updateRateMpAA = (changedRateMpAA: string[]) => {
        setMovieInfo({ ...movieInfo, rateMpAA: changedRateMpAA[0] });
    };

    const handleSubmit: THandleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSaveChanges(movieInfo);
    };

    const resetState: TResetState = () => {
        setMovieInfo({ ...initialState });
    };

    const movieIdField: JSX.Element | undefined = movieInfo?.id && <div className={`${blockName}__field-wrapper`}>
        <div className={`${blockName}__title`}>movie id</div>
        <div className={`${blockName}__text`}>{movieInfo.id}</div>
    </div>;

    return movieInfo && <form
        className={blockName}
        onSubmit={handleSubmit}>
        <h2 className={`${blockName}__headline`}>Edit Movie</h2>
        { movieIdField }
        <div className={`${blockName}__field-wrapper`}>
            <label
                htmlFor='title'
                className={`${blockName}__label`}>title</label>
            <input
                id='title'
                className={`${blockName}__input`}
                name='title'
                type='text'
                value={movieInfo.title}
                onChange={handleChange}/>
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <label
                htmlFor='releaseDate'
                className={`${blockName}__label`}>release date</label>
            <input
                id='releaseDate'
                className={`${blockName}__input`}
                name='release_date'
                type='text'
                value={movieInfo.release_date}
                onChange={handleChange}/>
            <FontAwesomeIcon
                className={`${blockName}__icon--bright`}
                icon={faCalendar}/>
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <label
                htmlFor='movieUrl'
                className={`${blockName}__label`}>movie url</label>
            <input
                id='movieUrl'
                className={`${blockName}__input`}
                name='url'
                type='text'
                value={url || 'Url here'}
                onChange={handleChange}/>
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <div className={`${blockName}__title`}>genre</div>
            <FormSelect
                passSelectedItems={updateGenres}
                appliedItems={movieInfo.genres}
                allItems={availableGenres}
                placeholder="Select Genre"/>
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <div className={`${blockName}__title`}>country</div>
            <FormSelect
                passSelectedItems={updateCountries}
                appliedItems={movieInfo.countries}
                allItems={availableCountries}
                placeholder="Select Countries"/>
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <div className={`${blockName}__title`}>producer</div>
            <FormSelect
                passSelectedItems={updateProducers}
                appliedItems={movieInfo.producers}
                allItems={availableProducers}
                placeholder="Select Countries"/>
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <div className={`${blockName}__title`}>rate mpaa</div>
            <FormSelect
                passSelectedItems={updateRateMpAA}
                appliedItems={[movieInfo.rateMpAA]}
                allItems={availableRatesMpAA}
                multiple={false}
                placeholder="Select Rate MpAA"/>
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <label
                htmlFor='overview'
                className={`${blockName}__label`}>overview</label>
            <input
                id='overview'
                className={`${blockName}__input`}
                name='overview'
                type='text'
                value={movieInfo.overview}
                onChange={handleChange}/>
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <label
                htmlFor='runtime'
                className={`${blockName}__label`}>runtime</label>
            <input
                id='runtime'
                className={`${blockName}__input`}
                name='runtime'
                type='text'
                value={movieInfo.runtime}
                onChange={handleChange}/>
        </div>
        <div className={`${blockName}__btn-wrapper`}>
            <button
                onClick={resetState}
                className={`${blockName}__btn--reset`}>
                    Reset
            </button>
            <input
                className={`${blockName}__btn--save`}
                type='submit'
                value='Save' />
        </div>
    </form>;
}