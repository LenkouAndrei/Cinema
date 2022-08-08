const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	email: String,
    password: String,
    userType: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

module.exports = mongoose.model("User", userSchema);