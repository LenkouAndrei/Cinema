import React, { useState } from 'react';
import { Logo } from '../../components';
import { IMovie, TNullable } from '../../types/types';
import { FormPage, Modal, Wrapper } from '../';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.scss';

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
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);

    const showModal: TVoidFunc = () => {
        setIsDialogOpen(true);
    };

    const hideModal: TVoidFunc = () => {
        setIsDialogOpen(false);
    };

    const createNewMovie: TCreateMovie = (newMovie: IMovie) => {
        onAddBtnClick(newMovie);
        hideModal();
    };

    const navigateToMainPage: TVoidFunc = () => {
        onSearchBtnClick();
    };

    const getHeaderElement: () => TNullable<JSX.Element> = () => {
        switch (pageName) {
            case PageName.Main:
                return <>
                    <button
                        className={'add-btn'}
                        onClick={showModal}>+ Add Movie</button>
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