const express = require("express");
const router = express.Router();
const MoviesCtrl = require('../controllers/movie.controll.js');
const GenresCtrl = require('../controllers/genres.controll.js');

router.get("/movies", MoviesCtrl.getAllMovies);
router.post("/movies", MoviesCtrl.addMovie);
router.get("/movies/:id", MoviesCtrl.getMovieById);
router.patch("/movies/:id", MoviesCtrl.updateMovie);
router.delete("/movies/:id", MoviesCtrl.deleteMovie);

router.get("/genres", GenresCtrl.getGenres);

module.exports = router;