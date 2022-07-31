import React, { ChangeEvent, MouseEvent, useState, useCallback } from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './form-select.scss';
import { allGenres } from './mockGenres';

interface ISelectFormProps {
    onApplyGenres: (newGenres: string[]) => void;
    genres: string[];
}

type TMouseClick = (event: MouseEvent) => void;
type TChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => void;

const blockName = 'form-select';

export function FormSelect({ genres, onApplyGenres }: ISelectFormProps): JSX.Element {
    const [ selectedGenres , setSelectedGenres ] = useState(genres);
    const [ isOpen , setIsOpen ] = useState(false);
    const genresOptions = Array.from(new Set([ ...allGenres, ...genres ]));

    const toggleSelectDropdown: TMouseClick = (event) => {
      event.preventDefault();
      event.stopPropagation();

      if ( !isOpen ) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
        onApplyGenres(selectedGenres);
      }
    };

    const handleCheckboxChange: TChangeEventHandler = (event) => {
      const { checked, name } = event.target as HTMLInputElement;
      const chosenGenres: string[] = checked ? [ ...selectedGenres, name ] :
          selectedGenres.filter(genre => genre !== name);
      setSelectedGenres(chosenGenres);
    };

    const genresList: JSX.Element[] = genresOptions.map(genre => {
        return <li
            className={`${blockName}__item`}
            key={genre}>
            <label className={`${blockName}__label`}>
                <input
                    className={`${blockName}__checkbox`}
                    type='checkbox'
                    name={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={handleCheckboxChange}/>
                {genre}
            </label>
        </li>;
    });

    return <>
        <button
            className={`${blockName}__btn`}
            onClick={toggleSelectDropdown}>
            <span className={`${blockName}__chosen-items`}>
                { selectedGenres.join(', ') || 'Select Genre' }
            </span>
            <FontAwesomeIcon
                className={`${blockName}__icon`}
                icon={faAngleDown}
                size='lg'/>
        </button>
        { isOpen && <ul className={`${blockName}__list`}>
            { genresList }
        </ul>}
    </>;
}