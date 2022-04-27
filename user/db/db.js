//db

const find = (email) => {
  try {

    return {name:"Alon Ofir", email: "t@tg.com", psswd: "1gts6gsdgs6gd"}
    // const sql = `SELECT * FROM user where email = ${email}`;
    // const user = await db.query(sql);
    // if (user) {
    //   return user;
    // } else {
    //   return `User: ${email}, does not exist`;
    // }
  } catch (error) {
    throw new Error(error.message);
  }
};

const create = async (user) => {
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

const update = async (user) => {
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

const del = async (user) => {
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

module.exports = {
  find,
  del,
  create,
  update
};
