const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

// Connect to MongoDB database
mongoose
	.connect("mongodb://localhost:27017/cinema", { useNewUrlParser: true })
	.then(() => {
		const app = express();
        app.use(express.json());
        app.use("/api", routes);

		app.listen(5000, () => {
			console.log("Server has started!")
		});
	})
    .catch(error => {
        console.error(error);
    });