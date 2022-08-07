const CountryModel = require("../models/Country");

const getCountries = async(_req, res) => {
    try {
        const countries = await CountryModel.find({});
        res.json(countries);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
};

module.exports = { getCountries };