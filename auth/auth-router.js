const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = require("../users/users-model");
const { jwtSecret } = require("../config/secrets");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
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
