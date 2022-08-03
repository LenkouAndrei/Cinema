const GenreModel = require("../models/Genre");

const getGenres = async(_req, res) => {
    try {
        const genres = await GenreModel.find({});
        res.json(genres);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
};

module.exports = { getGenres };