const express = require("express");
const router = express.Router();
const MoviesCtrl = require('../controllers/movie.controll');

router.get("/movies", MoviesCtrl.getAllMovies);
router.post("/movies", MoviesCtrl.addMovie);
router.get("/movies/:id", MoviesCtrl.getMovieById);
router.patch("/movies/:id", MoviesCtrl.updateMovie);
router.delete("/movies/:id", MoviesCtrl.deleteMovie);

module.exports = router;