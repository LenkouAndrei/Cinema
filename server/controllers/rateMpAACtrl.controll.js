const RateMpAAModel = require("../models/RateMpAA");

const getRatesMpAA = async(_req, res) => {
    try {
        const rateMpAA = await RateMpAAModel.find({});
        res.json(rateMpAA);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
};

module.exports = { getRatesMpAA };