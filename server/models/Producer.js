const mongoose = require("mongoose");

const producerSchema = mongoose.Schema({
	name: String,
});

module.exports = mongoose.model("Producer", producerSchema);