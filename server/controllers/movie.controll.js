const MovieModel = require("../models/Movie");

const getAllMovies = async(req, res) => {
    try {
        const query = req.querry;
        const movie = await MovieModel.find(query)
            .sort(req.sortCondition)
            .skip(req.skip || 0)
            .limit(req.limit || 50);
        res.send(movie);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
};

const addMovie = async(req, res) => {
    try {
        const {
            title, tagline, vote_average, vote_count, release_date, poster_path, overview, budget, revenue, genres, runtime
        } = req.body;
        const movie = new MovieModel({
            title, tagline, vote_average, vote_count, release_date, poster_path, overview, budget, revenue, genres, runtime
        });
        await movie.save();
        res.send(movie);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getMovieById = async(req, res) => {
    try {
        const movie = await MovieModel.findOne({ _id: req.params.id });
        res.send(movie);
    } catch(error) {
        console.log(error);
        res.status(404);
		res.send({ error: "Movie doesn't exist!" });
    }
};

const updateMovie = async(req, res) => {
	try {
		const movie = await MovieModel.findOne({ _id: req.params.id });
        const updatedMovie = { ...movie, ...req.body };

		await updatedMovie.save();
		res.send(updatedMovie);
	} catch {
		res.status(404);
		res.send({ error: "Movie doesn't exist!" });
	}
}

const deleteMovie = async(req, res) => {
	try {
		await MovieModel.deleteOne({ _id: req.params.id });
		res.status(204).send();
	} catch {
		res.status(404);
		res.send({ error: "Movie doesn't exist!" });
	}
}

module.exports = { getAllMovies, addMovie, getMovieById, updateMovie, deleteMovie };