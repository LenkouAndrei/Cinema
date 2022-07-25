const mongoose = require("mongoose");

const countrySchema = mongoose.Schema({
	name: String,
});

module.exports = mongoose.model("Country", countrySchema);