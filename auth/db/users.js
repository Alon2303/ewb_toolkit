const logger = require('../../utils/logger/logger');

//TODO: Hash + salt user passwords. If the user exist compare password(after hashing)
const getUser = (user) => {
    const sql = `SELECT * FROM USERS WHERE id = ${user.id}`
    db.query(sql);
}

module.exports = { getUser };