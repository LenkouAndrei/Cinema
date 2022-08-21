import React, { useEffect, useState } from 'react';
import { Logo } from '../../components';
import { IMovie, TNullable } from '../../types/types';
import { FormPage, Modal, Wrapper } from '../';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.scss';
import { movieService } from '../../services/movie.service';

export interface IHeaderProps {
    pageName: PageName;
    onAddBtnClick: (newMovie: IMovie) => void;
    onSearchBtnClick: () => void;
}

export enum PageName {
    Main = 'Main',
    Details = 'Details',
}

type TVoidFunc = () => void;
type TCreateMovie = (newMovie: IMovie) => void;

const blockName = 'header';

export function Header({ pageName, onAddBtnClick, onSearchBtnClick }: IHeaderProps): JSX.Element {
    let userType: string;
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);

    useEffect(() => {
        userType = sessionStorage.getItem('userType');
    }, []);

    const showModal: TVoidFunc = () => {
        setIsDialogOpen(true);
    };

    const hideModal: TVoidFunc = () => {
        setIsDialogOpen(false);
    };

    const createNewMovie: TCreateMovie = (newMovie: IMovie) => {
        movieService.addMovie(newMovie)
            .then(onAddBtnClick)
            .then(() => { hideModal(); })
    };

    const navigateToMainPage: TVoidFunc = () => {
        onSearchBtnClick();
    };

    const logger = () => {
        console.log('Log Log');
    }

    const getButton = () => {
        const userType = sessionStorage.getItem('userType');
        switch(userType) {
            case 'admin':
                return <button
                className={'add-btn'}
                onClick={showModal}>+ Add Movie</button>;
            case 'subscriber':
                return <button
                className={'search__btn favorite-btn'}
                onClick={logger}>Favorite</button>;
        }
    };

    const getHeaderElement: () => TNullable<JSX.Element> = () => {
        switch (pageName) {
            case PageName.Main:
                return <>
                    { sessionStorage.getItem('userType') && getButton() || null }
                    <Modal isOpen={isDialogOpen} handleClose={hideModal}>
                        <FormPage onSaveChanges={createNewMovie} movie={null}/>
                    </Modal>
                </>;
          case PageName.Details:
            return <button
              className={'search-btn'}
              onClick={navigateToMainPage}>
              <FontAwesomeIcon
                className={`${blockName}__icon`}
                icon={faSearch}/>
            </button>;
            default:
                return null;
        }
    };

    return <header className={blockName}>
        <Wrapper>
            <>
                <section className={`${blockName}__top`}>
                    <Logo/>
                    { getHeaderElement() }
                </section>
            </>
        </Wrapper>
    </header>;
}