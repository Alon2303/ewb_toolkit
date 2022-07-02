//db

const getUser = async (user) => {
  try {
    const sql = `SELECT * FROM user where email = ${user.email}`;
    const user = await db.query(sql);
    if (user) {
      return user;
    } else {
      return `User: ${user.email}, does not exist`;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getUser };
