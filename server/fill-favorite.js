const FavoriteModel = require("./models/Favorite");
const mongoose = require("mongoose");

const saveToFavoriteModel = async(el) => {
    const favorite = new FavoriteModel(el);
    await favorite.save();
}

mongoose
	.connect("mongodb://localhost:27017/movies", { useNewUrlParser: true })
	.then(() => {
        const favorites = [
            { userId: '62f0f372b23ec94b3abd1c4a', movieId: '62deaa885e8ec6aa3e74e627', comments: ['my first comment', 'my second comment', 'my last comment'] },
            { userId: '62f0f372b23ec94b3abd1c4a', movieId: '62deaa885e8ec6aa3e74e62b', comments: ['Test 1', 'Test 2', 'Test 3'] },
        ];
        return Promise.all(favorites.map(saveToFavoriteModel))
	})
    .then(() => {
        console.log('DONE');
        process.exit(0);
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });