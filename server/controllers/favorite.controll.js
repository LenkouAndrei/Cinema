const FavoriteModel = require("../models/Favorite");
const mongoose = require('mongoose');
const { getUpdatedMovieById } = require("./movie.controll");
const ObjectId = mongoose.Types.ObjectId;

const updateFields = async(favorite) => {
    favorite.movie = await getUpdatedMovieById(favorite.movieId);
    delete favorite.movieId;
    return favorite;
};

const getFavorites = async(req, res) => {
    try {
        const { userId } = req.query;
        const favorites = await FavoriteModel.find({ userId }).lean();
        const updatedFavorites = await Promise.all(favorites.map(updateFields));
        res.json(updatedFavorites);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
};

const addFavorite = async(req, res) => {
    try {
        const {
            userId,
            movieId,
            comments,
        } = req.body.favoriteWithUpdates;
        const favorite = new FavoriteModel({
            userId: ObjectId(userId),
            movieId: ObjectId(movieId),
            comments,
        });
        await favorite.save();
        res.send(favorite);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
};

const getFavoriteById = async(req, res) => {
    try {
        const favorite = await FavoriteModel.findOne({ _id: req.params.id }).lean();
        res.send(favorite);
    } catch(error) {
        console.log(error);
        res.status(404);
		res.send({ error: "Favorite doesn't exist!" });
    }
};

const updateFavorite = async(req, res) => {
	try {
        const { favoriteWithUpdates = {} } = req.body;
        favoriteWithUpdates.userId = ObjectId(favoriteWithUpdates.userId);
        favoriteWithUpdates.movieId = ObjectId(favoriteWithUpdates.movieId);
		const updatedFavorite = await FavoriteModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: favoriteWithUpdates },
            { new: true }
        ).lean();
		res.send(updatedFavorite);
	} catch {
		res.status(404);
		res.send({ error: "Favorite doesn't exist!" });
	}
};

const deleteFavorite = async(req, res) => {
	try {
		await FavoriteModel.deleteOne({ _id: req.params.id });
		res.status(204).send();
	} catch {
		res.status(404);
		res.send({ error: "Favorite doesn't exist!" });
	}
}

module.exports = {
    getFavorites,
    addFavorite,
    getFavoriteById,
    updateFavorite,
    deleteFavorite
};