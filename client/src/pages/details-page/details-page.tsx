import React from 'react';
import { Footer, Header } from '../../containers';
import { DetailsContainer } from '../../components';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export const DetailsPage = () => {
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
            <DetailsContainer />
            <Footer />
        </>
    )
}