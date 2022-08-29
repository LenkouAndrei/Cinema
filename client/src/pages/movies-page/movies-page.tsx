import React, { useState } from 'react';
import { Footer, Header, Main } from '../../containers';
import { Link } from "react-router-dom";
import { FormPage, Modal } from '../../containers';
import { TNullable, IMovie } from '../../types/types';
import { movieService } from '../../services/movie.service';

type TUserType = TNullable<'admin' | 'subscriber'>;
type TVoidFunc = () => void;
type TCreateMovie = (newMovie: IMovie) => void;

export const MoviesPage = () => {
    const [newMovie, setNewMovie] = useState(null);
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);

    const showModal: TVoidFunc = () => {
      setIsDialogOpen(true);
    };

    const hideModal: TVoidFunc = () => {
      setIsDialogOpen(false);
    };

    const getButton = () => {
      const userType = sessionStorage.getItem('userType') as TUserType;
      switch(userType) {
        case 'admin':
            return <button
              className={'add-btn'}
              onClick={showModal}>+ Add Movie</button>;
        case 'subscriber':
            return <Link to="/favorites" className="search__btn link">
                Favorite
            </Link>;
          default:
            return null;
      }
    };

  const createNewMovie: TCreateMovie = (newMovie: IMovie) => {
    movieService.addMovie(newMovie)
        .then(setNewMovie)
        .then(() => { hideModal(); })
  };

 return (
     <>
        <Modal isOpen={isDialogOpen} handleClose={hideModal}>
          <FormPage onSaveChanges={createNewMovie} movie={null}/>
        </Modal>
        <Header>{ getButton()}</Header>
        <Main movieToAdd={newMovie}/>
        <Footer />
     </>
 )
}