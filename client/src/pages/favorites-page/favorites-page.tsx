import React from 'react';
import { Footer, Header } from '../../containers';
import { FavoriteList } from '../../components';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export const FavoritesPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header>
                <button
                    className="search-btn"
                    onClick={() => { navigate('/movies') }}>
                    <FontAwesomeIcon
                        className="header__icon"
                        icon={faSearch}/>
                </button>
            </Header>
            <FavoriteList />
            <Footer />
        </>
    )
}