const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
	title: String,
	tagline: String,
	vote_average: Number,
	vote_count: Number,
	release_date: Date,
	poster_path: String,
	overview: String,
	budget: Number,
	revenue: Number,
	genres: { type : Array },
	runtime: Number,
	producers: { type: Array },
	countries: { type: Array },
	rateMpAA: String,
});

module.exports = mongoose.model("Movie", movieSchema);