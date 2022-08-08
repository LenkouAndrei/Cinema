const UserModel = require("../models/User");

const getAccess = async(req, res) => {
    try {
        const { password, email } = req.body;
        const user = await UserModel.findOne({ email }).lean();
        console.log('user: ', user);
        console.log('user.password: ', user.password);
        console.log('password: ', password);
        console.log('isEqual: ', user.password === password);
        console.log('user.userType: ', user.userType);
        let userType = null;
        if (password && user?.password === password) {
            userType = user.userType;
        }
        res.json({ userType });
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
};

module.exports = { getAccess };