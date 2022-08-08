import React from 'react';
import { ErrorBoundary } from '../containers';
import { AuthorizationPage } from '../pages/authorization-page/authorization-page';
import { MoviesPage } from '../pages/movies-page/movies-page';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './app.scss';

function App(): JSX.Element {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthorizationPage />}></Route>
            <Route path="/movies" element={<MoviesPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;