const UserModel = require("../models/User");

const getAccess = async(req, res) => {
    try {
        const { password, email } = req.query;
        const user = await UserModel.find({ email }).lean();
        const isAccessDenied = !!user || user.password !== password;
        res.json({ isAccessDenied });
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
};

module.exports = { getAccess };