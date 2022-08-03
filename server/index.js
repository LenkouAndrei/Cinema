const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const http = require('http');
const cors = require('cors')

// Connect to MongoDB database
mongoose
	.connect("mongodb://localhost:27017/movies", { useNewUrlParser: true })
	.then(() => {
		const corsOptions = {
			origin: 'http://localhost:3000/',
			optionsSuccessStatus: 200
		};
		const app = express()
			.use(cors())
        	.use(express.json())
        	.use("/api", routes);

		app.listen(5000, () => {
			console.log("Server has started!")
		});
	})
    .catch(error => {
        console.error(error);
    });