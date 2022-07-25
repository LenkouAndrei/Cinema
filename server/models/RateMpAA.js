const mongoose = require("mongoose");

const rateMpAASchema = mongoose.Schema({
	name: String,
    ageLimit: Number,
});

module.exports = mongoose.model("RateMpAA", rateMpAASchema);