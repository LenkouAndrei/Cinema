const UserModel = require("../models/User");

const getAccess = async(req, res) => {
    try {
        const { password, email } = req.body;
        const user = await UserModel.findOne({ email }).lean();
        let userType = null;
        if (password && user?.password === password) {
            userType = user.userType;
        }
        res.json({ userType, userId: user._id });
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
};

module.exports = { getAccess };