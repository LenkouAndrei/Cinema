import React from 'react';
import { IMoviesGenresConfig, IGenresListItem } from '../../types/types';
import './result-filter.scss';

interface IResultFilterProps extends IMoviesGenresConfig {
    onGenreClick: (genre: IGenresListItem) => void;
}

const blockName = 'result-filter';

type TResultFilter = (props: IResultFilterProps) => JSX.Element;

export const ResultFilter: TResultFilter = ({ genres, currentGenre, onGenreClick }: IResultFilterProps) => {
    const listItems: JSX.Element[] = genres.map(({ name, id }) => {
        return <li
            className={`${blockName}__item`}
            key={id}>
                <button
                    className={`${blockName}__btn  ${currentGenre.id === id ? 'highlight' : ''}`}
                    onClick={() => onGenreClick({ name, id })}>{name}</button>
            </li>;
    });
    return <ul className={`${blockName}__list`}>{listItems}</ul>;
};