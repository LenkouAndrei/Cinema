const express = require("express");
const router = express.Router();
const MoviesCtrl = require('../controllers/movie.controll.js');
const GenresCtrl = require('../controllers/genres.controll.js');
const CountriesCtrl = require('../controllers/countries.controll.js');
const ProducersCtrl = require('../controllers/producers.controll.js');
const RateMpAACtrl = require('../controllers/rateMpAACtrl.controll.js');
const UserCtrl = require('../controllers/user.controll.js');
const FavoriteCtrl = require('../controllers/favorite.controll.js');

router.get("/movies", MoviesCtrl.getAllMovies);
router.post("/movies", MoviesCtrl.addMovie);
router.get("/movies/:id", MoviesCtrl.getMovieById);
router.patch("/movies/:id", MoviesCtrl.updateMovie);
router.delete("/movies/:id", MoviesCtrl.deleteMovie);

router.get("/genres", GenresCtrl.getGenres);
router.get("/countries", CountriesCtrl.getCountries);
router.get("/producers", ProducersCtrl.getProducers);
router.get("/rateMpAA", RateMpAACtrl.getRatesMpAA);

router.post("/user", UserCtrl.getAccess);

router.get("/favorites", FavoriteCtrl.getFavorites);
router.post("/favorites", FavoriteCtrl.addFavorite);
router.get("/favorites/:id", FavoriteCtrl.getFavoriteById);
router.patch("/favorites/:id", FavoriteCtrl.updateFavorite);
router.delete("/favorites/:id", FavoriteCtrl.deleteFavorite);

module.exports = router;