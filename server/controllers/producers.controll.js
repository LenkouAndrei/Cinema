const ProducerModel = require("../models/Producer");

const getProducers = async(_req, res) => {
    try {
        const producers = await ProducerModel.find({});
        res.json(producers);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
};

module.exports = { getProducers };