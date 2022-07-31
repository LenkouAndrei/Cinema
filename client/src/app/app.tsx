import React, { useState } from 'react';
import {
  ErrorBoundary,
  Footer,
  Header,
  Main,
  PageName,
} from '../containers';
import './app.scss';

function App(): JSX.Element {
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
    <React.StrictMode>
      <ErrorBoundary>
        <Header
          onAddBtnClick={setNewMovie}
          onSearchBtnClick={clickSearchBtn}
          pageName={pageName}/>
        <Main
          movieToAdd={newMovie}
          areDetailsVisible={areDetailsVisible}
          onChangePage={changePage}
        />
        <Footer />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;