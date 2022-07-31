import React from 'react';
import { IMoviesGenresConfig, TGenresListItem } from '../../types/types';
import './result-filter.scss';

interface IResultFilterProps extends IMoviesGenresConfig {
    onGenreClick: (genre: TGenresListItem) => void;
}

const blockName = 'result-filter';

type TResultFilter = (props: IResultFilterProps) => JSX.Element;

export const ResultFilter: TResultFilter = ({ genres, currentGenre, onGenreClick }: IResultFilterProps) => {
    const listItems: JSX.Element[] = genres.map(title => {
        return <li
            className={`${blockName}__item`}
            key={title}>
                <button
                    className={`${blockName}__btn  ${currentGenre === title ? 'highlight' : ''}`}
                    onClick={() => onGenreClick(title)}>{title}</button>
            </li>;
    });
    return <ul className={`${blockName}__list`}>{listItems}</ul>;
};