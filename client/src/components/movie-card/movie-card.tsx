import React, { useState, useCallback } from 'react';
import { faAlignJustify, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMovie } from '../../types/types';
import useOutsideClick from '../../hooks/useOutsideClick';
import './movie-card.scss';
import { menuItemTitles } from './mockMenuTitles';

const blockName = 'movie';

interface IMovieCardProps {
    movie: IMovie;
    onClickMovie?: (modalDialogType: string) => void;
}

const preventAndStop = (event: any) => {
  event.preventDefault();
  event.stopPropagation();
}

export function MovieCard({ movie, onClickMovie }: IMovieCardProps): JSX.Element {
    const [ isEditMenuVisible, setIsEditMenuVisible ] = useState(false);
    const wrapperRef: React.RefObject<HTMLInputElement> = React.createRef();

    const hideEditMenu = (event: any) => {
      preventAndStop(event);
      setIsEditMenuVisible(false);
    };

    const showEditMenu = (event: any) => {
      preventAndStop(event);
      setIsEditMenuVisible(true);
    };

    useOutsideClick(wrapperRef, () => { setIsEditMenuVisible(false); });

    const handleMenuListItemClick = (itemTitle: string) => (event: any) => {
      preventAndStop(event);
      if (onClickMovie) {
        onClickMovie(itemTitle);
      }
      setIsEditMenuVisible(false);
    };
    
    const getMenuItems = () => {
        const userType = sessionStorage.getItem('userType');
        switch(userType) {
            case 'admin':
                return ['Edit', 'Delete'];
            case 'subscriber':
                return ['Add to favorite'];
            default:
                return [];
        }
    }

    const menuListItems: JSX.Element[] = getMenuItems().map((itemTitle: string) => {
        return <li
            key={itemTitle}
            className={'menu__list-item'}
            onClick={handleMenuListItemClick(itemTitle)}>{ itemTitle }</li>;
    });

    const menu: JSX.Element = <div
        className={`${blockName}__menu menu`}
        ref={wrapperRef}>
        <button
            className={'menu__btn--close'}
            onClick={hideEditMenu}>
            <FontAwesomeIcon
                className={'menu__icon'}
                icon={faTimes}/>
        </button>
        <ul className={'menu__list'}>
            { menuListItems }
        </ul>
    </div>;

    const icon: JSX.Element = <div
        className={`${blockName}__icon-container`}
        onClick={showEditMenu}>
        <FontAwesomeIcon
            className={`${blockName}__icon`}
            icon={faAlignJustify}
            onClick={showEditMenu} />
        </div>;

    return <figure className={blockName}>
        <img
            className={`${blockName}__image`}
            src={movie.poster_path}
            alt={movie.title}/>
        <figcaption className={`${blockName}__info`}>
            <span className={`${blockName}__title`}>{movie.title}</span>
            <span className={`${blockName}__release-date`}>{movie.release_date}</span>
            <span className={`${blockName}__genres`}>{movie.genres.join(', ')}</span>
            { onClickMovie && <div
                className={`${blockName}__settings`}>
                    { isEditMenuVisible ? menu : icon }
            </div> }
        </figcaption>
    </figure>;
}