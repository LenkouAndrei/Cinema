const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
    userId: String,
    movieId: String,
    comments: Array,
});

favoriteSchema.index({ userId:1, movieId:1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);