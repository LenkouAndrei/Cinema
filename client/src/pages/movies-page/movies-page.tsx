import React, { useState } from 'react';
import {
    Footer,
    Header,
    Main,
    PageName
  } from '../../containers';

export const MoviesPage = () => {
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
        <Header
          onAddBtnClick={setNewMovie}
          onSearchBtnClick={clickSearchBtn}
          pageName={pageName}/>
        <Main
          movieToAdd={newMovie}
          areDetailsVisible={areDetailsVisible}
          onChangePage={changePage}/>
        <Footer />
     </>
 )
}