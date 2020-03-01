const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = require("../users/users-model");
const {
  jwtSecret
} = require("../config/secrets");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  users.addUser(user)
    .then(newUser => {
      const token = generateToken(newUser)
      res.status(201).json({
        message: "Successfully created a new user.",
        token
      })
    })
    .catch(({
      name,
      code,
      message,
      stack
    }) => {
      res.status(500).json({
        name,
        code,
        message,
        stack
      })
    })
});

router.post("/login", (req, res) => {
  let {
    email,
    password
  } = req.body;

  users.findBy({
      email
    })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({
          message: `Welcome back, ${user.firstName}!`,
          token
        })
      } else {
        res.status(401).json({
          message: 'Invalid Credentials'
        });
      }
    })
    .catch(({
      name,
      code,
      message,
      stack
    }) => {
      res.status(500).json({
        name,
        code,
        message,
        stack
      })
    })
});

function generateToken(user) {
  const payload = {
    firstName: user.firstName,
    lastName: user.lastName
  };
  const options = {
    expiresIn: "5h"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;