const express = require("express");
const MovieModel = require("../models/Movie");
const router = express.Router();

// Get all posts
router.get("/movies", async (req, res) => {
    try {
        const movie = await MovieModel.find();
        res.send(movie);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post("/movies", async (req, res) => {
    try {
        // const {
        //     title, tagline, vote_average, vote_count, release_date, poster_path, overview, budget, revenue, genres, runtime
        // } = req.body;
        const data = '../data.json';
        const idx = data.findIndex(el => el.id === req.body.id);
        const el = data[idx];
        const movie = new MovieModel({ ...el });
        await movie.save();
        res.send(movie);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get("/movies/:id", async (req, res) => {
    try {
        console.log('req.params.id: ', req.params.id);
        const movie = await MovieModel.findOne({ _id: req.params.id });
        res.send(movie);
    } catch(error) {
        console.log(error);
        res.status(404);
		res.send({ error: "Movie doesn't exist!" });
    }
});

router.patch("/movies/:id", async (req, res) => {
	try {
		const movie = await MovieModel.findOne({ _id: req.params.id });
        const updatedMovie = { ...movie, ...req.body };

		await updatedMovie.save();
		res.send(updatedMovie);
	} catch {
		res.status(404);
		res.send({ error: "Movie doesn't exist!" });
	}
});

router.delete("/movies/:id", async (req, res) => {
	try {
		await MovieModel.deleteOne({ _id: req.params.id });
		res.status(204).send();
	} catch {
		res.status(404);
		res.send({ error: "Movie doesn't exist!" });
	}
});

module.exports = router;