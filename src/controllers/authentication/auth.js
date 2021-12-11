const mockDb = require("../../mockDb");
const jwt = require("jsonwebtoken");
const moment = require("moment");

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

const createToken () {
	const 
	
}

module.exports = { auth }
