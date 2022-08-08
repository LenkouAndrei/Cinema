const UserModel = require("./models/User");
const mongoose = require("mongoose");

const saveToUserModel = async(el) => {
    const user = new UserModel(el);
    await user.save();
}

mongoose
	.connect("mongodb://localhost:27017/movies", { useNewUrlParser: true })
	.then(() => {
        const users = [
            { userType: 'subscriber', firstName: 'Fiodor', lastName: 'Aleksin', email: 'f.aleksin-test1@gmail.com', password: 'film1' },
            { userType: 'admin', firstName: 'Georgi', lastName: 'Pliasov', email: 'g.pliasov-test1@gmail.com', password: 'film2' },
        ];
        return Promise.all(users.map(saveToUserModel))
	})
    .then(() => {
        console.log('DONE');
        process.exit(0);
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });