const express = require("express");
const CinemaModel = require("../models/Cinema");
const router = express.Router();

// Get all posts
router.get("/cinemas", async (req, res) => {
    try {
        const posts = await CinemaModel.find();
        res.send(posts);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post("/cinemas", async (req, res) => {
    try {
        const {
            title, tagline, vote_average, vote_count, release_date, poster_path, overview, budget, revenue, genres, runtime
        } = req.body;
        const cinema = new CinemaModel({
            title, tagline, vote_average, vote_count, release_date, poster_path, overview, budget, revenue, genres, runtime
        });
        await cinema.save();
        res.send(cinema);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get("/cinemas/:id", async (req, res) => {
    try {
        console.log('req.params.id: ', req.params.id);
        const cinema = await CinemaModel.findOne({ _id: req.params.id });
        res.send(cinema);
    } catch(error) {
        console.log(error);
        res.status(404);
		res.send({ error: "Cinema doesn't exist!" });
    }
});

router.patch("/cinemas/:id", async (req, res) => {
	try {
		const cinema = await CinemaModel.findOne({ _id: req.params.id });
        const updatedCimena = { ...cinema, ...req.body };

		await updatedCimena.save();
		res.send(updatedCimena);
	} catch {
		res.status(404);
		res.send({ error: "Cinema doesn't exist!" });
	}
});

router.delete("/cinemas/:id", async (req, res) => {
	try {
		await CinemaModel.deleteOne({ _id: req.params.id });
		res.status(204).send();
	} catch {
		res.status(404);
		res.send({ error: "Post doesn't exist!" });
	}
});

module.exports = router;