const { find, del, update, create } = require('../db/db.js');

const getUser =  (req, res) => {
    return find(user);
}

const deleteUser = async (req, res) => {
    const user = await del(user);
}

const updateUser = async (req, res) => {
    const user = await update(user);
}

const createUser = async (req, res) => {
    if (Object.keys(req.query).length === 0) return null;
    const { email } = req.query.email;
    const { psswd } = req.query.psswd;
    const hash = saltHash(email, psswd);
    await create({email, password: hash})
    // Send to user/db/db.js (sql)
    
  };

module.exports = {
    getUser,
    deleteUser,
    updateUser,
    createUser
};