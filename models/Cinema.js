const mongoose = require("mongoose");

const cinemaSchema = mongoose.Schema({
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
	runtime: Number
});

module.exports = mongoose.model("Cinema", cinemaSchema);