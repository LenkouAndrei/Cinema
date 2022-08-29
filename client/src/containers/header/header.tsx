import React, { useEffect, useState } from 'react';
import { Logo } from '../../components';
import { IMovie, TNullable } from '../../types/types';
import { FormPage, Modal, Wrapper } from '../';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.scss';
import { movieService } from '../../services/movie.service';
import { useNavigate, Link, createSearchParams } from "react-router-dom";

export interface IHeaderProps {
    pageName?: PageName;
    onAddBtnClick?: (newMovie: IMovie) => void;
    onSearchBtnClick?: () => void;
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

    const preventAndStop = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
    };

    useEffect(() => {
        userType = sessionStorage.getItem('userType');
    }, []);

    const navigate = useNavigate();

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

    const getButton = () => {
        const userType = sessionStorage.getItem('userType');
        switch(userType) {
            case 'admin':
                return <button
                className={'add-btn'}
                onClick={showModal}>+ Add Movie</button>;
            case 'subscriber':
                return <Link to="/favorites" className="search__btn link">
                    Favorite
                </Link>;
    }
    };

    const logout = (event: any) => {
        preventAndStop(event);
        navigate("/");
        sessionStorage.removeItem('userType');
        sessionStorage.removeItem('userId');
    }

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

    const testTest = () =>
    navigate({
        pathname: "/details",
        search: createSearchParams({
            foo: "bar"
        }).toString()
    });

    return <header className={blockName}>
        <Wrapper>
            <>
                <section className={`${blockName}__top`}>
                    <Logo/>
                    { getHeaderElement() }
                    <button onClick={testTest}>Test</button>
                    <button
                        className="search__btn"
                        onClick={logout}>Logout</button>
                </section>
            </>
        </Wrapper>
    </header>;
}