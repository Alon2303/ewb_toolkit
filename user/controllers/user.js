const { getUser } = require('../db/db');

const foo = async (req, res) => {
    const user = await getUser(user);
}

module.exports = user;