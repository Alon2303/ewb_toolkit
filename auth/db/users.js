const logger = require("../../utils/logger/logger");
const { saltHash } = require("../../utils/utils");

//TODO: Hash + salt user passwords. If the user exist compare password(after hashing)
const getUser = (req, res) => {
  const sql = `SELECT * FROM USERS WHERE id = ${user.id}`;
  // db.query(sql);
  const { email } = req.query.email;
  const { password } = req.query.password;
  return {
    name: "Alon",
    surname: "Ofir",
    email: "test2@test.com",
    roles: ["admin"],
  };
};

const createUser = (req, res) => {
  if (Object.keys(req.query).length === 0) return null;

  const { email } = req.query.email;
  const { password } = req.query.password;
  saltHash()
};

module.exports = { getUser };
