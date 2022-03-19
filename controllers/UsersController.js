const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connection } = require("../database/db");

//create controller for register

const register = async (req, res) => {
  const { firstName, lastName, age, country, email, password, user_image } =
    req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  const query = `insert into users (firstName,lastName,age,country,email,password,user_image) values (?,?,?,?,?,?,?)`;

  const data = [
    firstName,
    lastName,
    age,
    country,
    email,
    hashPassword,
    user_image
  ];

  connection.query(query, data, (err, result) => {

    if (err) {
      console.log(err);
      res.status(409).json({
        success: false,
        message: `The email already exists`,
        err: err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Success User Added`,
        results: result,
      });
    }
  });
};

//create controller for login

const login = (req, res) => {
  const { email, password } = req.body;
  const query = `select * from users where email =? and is_deleted = 0`;
  const data = [email];
  connection.query(query, data, async (err, result) => {
    if (err) {
     return res
        .status(404)
        .json({ success: false, message: "server error", err: err });
    }
    if (result.length) {
      const valid = await bcrypt.compare(password, result[0].password);
      if (valid) {
        console.log(result);
        const payload = {
          userId: result[0].id,
          firstName: result[0].firstName,
          lastName: result[0].lastName,
          country: result[0].country,
          image: result[0].user_image,
        };

        const options = {
          expiresIn: "20h",
        };

        const token = jwt.sign(payload, process.env.SECRET, options);

        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "The password you’ve entered is incorrect",
        });
      }
    } else {
      res
        .status(404)
        .json({ success: false, message: "The email doesn't exist" });
    }
  });
};

//create controller for updateUserById

const updateUserById = (req, res) => {
  const userId = req.token.userId;
  const { firstName, lastName, age, country, email, user_image } = req.body;

  const query = `UPDATE users SET firstName=?,lastName=?,age=?,country=? ,email=?,user_image=?where id=? and is_deleted =0`;
  const data = [firstName, lastName, age, country, email, user_image, userId];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    } else {
      if (!result.affectedRows) {
        return res.status(200).json({
          success: false,
          message: `No user found with the indicated id => ${userId}`,
        });
      }
      return res.status(200).json({
        success: true,
        message: `The user with user_id was updated => ${userId} `,
      });
    }
  });
};

//create controller for deleteUserById

const deleteUserById = (req, res) => {
  const userId = req.token.userId;
  const query = `UPDATE users SET is_deleted =1 where id=? and is_deleted =0`;
  const data = [userId];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    } else {
      if (!result.affectedRows) {
        return res.status(404).json({
          success: false,
          message: `No users found with the indicated id => ${userId}`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The users with user_id was deleted=> ${userId} `,
      });
    }
  });
};

//create controller for getAllUsers

const getAllUsers = (req, res) => {
  const query = `select * from users  where is_deleted = 0`;

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "server error", err: err });
    } else {
      res
        .status(200)
        .json({ success: true, message: `All the users`, results: result });
    }
  });
};
const getUserById = (req, res) => {
  console.log("batatata");
  const userId = req.token.userId;
  const query = `select * from users  where id = ? AND is_deleted = 0`;
  const data = [userId];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    } else {
      if (!result.length) {
        return res.status(404).json({
          success: false,
          message: `no users found with the indicated  id => ${userId}`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The user id=> ${userId} `,
        results: result,
      });
    }
  });
};



const getchannelById = (req, res) => {
  const userId = req.params.id;
  const query = `select * from users  where id = ? AND is_deleted = 0`;
  const data = [userId];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    } else {
      if (!result.length) {
        return res.status(404).json({
          success: false,
          message: `no users found with the indicated  id => ${userId}`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The user id=> ${userId} `,
        results: result,
      });
    }
  });
};




module.exports = {
  register,
  login,
  updateUserById,
  deleteUserById,
  getAllUsers,
  getUserById,
  getchannelById
};
