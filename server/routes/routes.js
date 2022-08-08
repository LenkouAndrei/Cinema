const express = require("express");
const router = express.Router();
const MoviesCtrl = require('../controllers/movie.controll.js');
const GenresCtrl = require('../controllers/genres.controll.js');
const CountriesCtrl = require('../controllers/countries.controll.js');
const ProducersCtrl = require('../controllers/producers.controll.js');
const RateMpAACtrl = require('../controllers/rateMpAACtrl.controll.js');
const UserCtrl = require('../controllers/user.controll.js');

router.get("/movies", MoviesCtrl.getAllMovies);
router.post("/movies", MoviesCtrl.addMovie);
router.get("/movies/:id", MoviesCtrl.getMovieById);
router.patch("/movies/:id", MoviesCtrl.updateMovie);
router.delete("/movies/:id", MoviesCtrl.deleteMovie);

router.get("/genres", GenresCtrl.getGenres);
router.get("/countries", CountriesCtrl.getCountries);
router.get("/producers", ProducersCtrl.getProducers);
router.get("/rateMpAA", RateMpAACtrl.getRatesMpAA);

router.get("/user", UserCtrl.getAccess);
// router.post("/user", UserCtrl.addUser);

module.exports = router;