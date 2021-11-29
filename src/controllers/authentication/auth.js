const mockDb = require("../../mockDb");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	const { email } = req.body.user;
	const authUser = mockDb.filter(user => user.email === email);
	const userAuthenticated = (authUser.length) ? true : false;
	if(userAuthenticated) {
		next();
	} else {
		throw new Error("User does not exist!");
	}

}

module.exports = { auth }
