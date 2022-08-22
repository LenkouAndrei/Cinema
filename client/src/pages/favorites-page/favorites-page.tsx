import React, { useState } from 'react';
import { Footer, Header, PageName } from '../../containers';
import { FavoriteList } from '../../components';


export const FavoritesPage = () => {
    const [newMovie, setNewMovie] = useState(null);
    const [pageName, setPageName] = useState(PageName.Main);
    const [areDetailsVisible, setAreDetailsVisible] = useState(false);

    const changePage = () => {
        setPageName(PageName.Details);
        setAreDetailsVisible(true);
    };

    const clickSearchBtn = () => {
        setPageName(PageName.Main);
        setAreDetailsVisible(false);
    };

 return (
     <>
        <Header />
        <FavoriteList />
        <Footer />
     </>
 )
}