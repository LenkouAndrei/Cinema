const MovieModel = require("../models/Movie");
const CountryModel = require("../models/Country");
const GenreModel = require("../models/Genre");
const ProducerModel = require("../models/Producer");
const RateMpAAModel = require("../models/RateMpAA");

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getGenre = async(genreId) => {
    const { name } = await GenreModel.findOne({ _id: genreId }, { name: 1 });
    return name;
};

const getProducer = async(producerId) => {
    const { name } =  await ProducerModel.findOne({ _id: producerId }, { name: 1 });
    return name;
};

const getCountry = async(countryId) => {
    const { name } =  await CountryModel.findOne({ _id: countryId }, { name: 1 });
    return name;
};

const getRateMpAA = async(rateMpAAId) => {
    const { name, ageLimit } =  await RateMpAAModel.findOne({ _id: rateMpAAId }, { name: 1, ageLimit: 1 });
    return { name, ageLimit };
};

const updateFields = async(movie) => {
    movie.genres = await Promise.all(movie.genres.map(getGenre));
    movie.producers = await Promise.all(movie.producers.map(getProducer));
    movie.countries = await Promise.all(movie.countries.map(getCountry));
    const rateMpAA = await getRateMpAA(movie.rateMpAA); // TODO: made a correct view
    delete movie.rateMpAA
    return { ...movie, rateMpAA };
};

const getAllMovies = async(req, res) => {
    try {
        const { skip = 0, limit = 5, sortField = 'release_date', sortOrder = 1, genreId = null, searchText = '' } = req.query;
        const searchQuery = { title: { $regex: searchText, $options: "i" } };
        if (genreId) {
            searchQuery.genres = ObjectId(genreId);
        }
        const movies = await MovieModel.find(searchQuery).sort({ [sortField]: +sortOrder }).skip(+skip).limit(+limit).lean();
        const moviesAmount = await MovieModel.find(searchQuery).countDocuments();
        const updatedMovies = await Promise.all(movies.map(updateFields));
        res.json({ movies: updatedMovies, moviesAmount });
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
};

const addMovie = async(req, res) => {
    try {
        const {
            title,
            tagline,
            vote_average,
            vote_count,
            release_date,
            poster_path,
            overview,
            budget,
            revenue,
            genres,
            runtime,
            producers,
            countries,
            rateMpAA
        } = req.body;
        const movie = new MovieModel({
            title,
            tagline,
            vote_average,
            vote_count,
            release_date,
            poster_path,
            overview,
            budget,
            revenue,
            genres: genres.map(value => ObjectId(value)),
            runtime,
            producers: producers.map(value => ObjectId(value)),
            countries: countries.map(value => ObjectId(value)),
            rateMpAA: ObjectId(rateMpAA),
        });
        await movie.save();
        res.send(movie);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getUpdatedMovieById = async(movieId) => {
    const movie = await MovieModel.findOne({ _id: movieId }).lean();
    return updateFields(movie);
}

const getMovieById = async(req, res) => {
    try {
        const updatedMovie = await getUpdatedMovieById(req.params.id);
        res.send(updatedMovie);
    } catch(error) {
        console.log(error);
        res.status(404);
		res.send({ error: "Movie doesn't exist!" });
    }
};

const updateMovie = async(req, res) => {
	try {
        const { movieWithUpdates = {} } = req.body;
        movieWithUpdates.genres = movieWithUpdates.genres.map(value => ObjectId(value));
        movieWithUpdates.producers = movieWithUpdates.producers.map(value => ObjectId(value));
        movieWithUpdates.countries = movieWithUpdates.countries.map(value => ObjectId(value));
        movieWithUpdates.rateMpAA = ObjectId(movieWithUpdates.rateMpAA);
		const updatedMovie = await MovieModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: movieWithUpdates },
            { new: true }
        ).lean();
        const movieWithUpdatedFields = await updateFields(updatedMovie);
		res.send(movieWithUpdatedFields);
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

module.exports = { getAllMovies, addMovie, getMovieById, updateMovie, deleteMovie, getUpdatedMovieById };