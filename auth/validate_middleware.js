const users = require("../users//users-model");
const students = require("../students/students-model");

module.exports = {
  validateId,
  validateRegisterBody,
  validateUpdateBody,
  validateLoginBody,
  validateUniqueEmail,
  validateStudentBody,
  validateStudentId,
  validateProjectBody,
  validateProfessorId
};


function validateId(req, res, next) {
  users
    .findBy({
      id: req.params.id
    })
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({
          error: "That user does not exist."
        });
      }
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({
        name,
        code,
        message,
        stack
      });
    });
}

function validateRegisterBody(req, res, next) {
  Object.keys(req.body).length === 0 && req.body.constructor === Object
    ? res.status(400).json({
        error: "Missing request body."
      })
    : !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !req.body.password
    ? res.status(400).json({
        error: "firstName, lastName, email, and password are required."
      })
    : next();
}

function validateUpdateBody(req, res, next) {
  Object.keys(req.body).length === 0 && req.body.constructor === Object
    ? res.status(400).json({
        error: "Missing request body."
      })
    : !req.body.firstName || !req.body.lastName || !req.body.email
    ? res.status(400).json({
        error: "firstName, lastName, and email are required."
      })
    : next();
}

function validateLoginBody(req, res, next) {
  Object.keys(req.body).length === 0 && req.body.constructor === Object
    ? res.status(400).json({
        error: "Missing request body."
      })
    : !req.body.email || !req.body.password
    ? res.status(400).json({
        error: "email and password are required"
      })
    : next();
}

function validateUniqueEmail(req, res, next) {
  users
    .findBy({
      email: req.body.email
    })
    .then(user => {
      // is there a user with this email? if not, next(). Else:
      !user
        ? next()
        : // does an id in the params exist, and does it equal the user's id?
        // if true, next(). Else: the email is already in use
        req.params.id && parseInt(req.params.id) === user.id
        ? next()
        : res.status(400).json({
            error: "That email is already in use."
          });
    })
    .catch(err => {
      res.status(500).json({
        error: "Couldn't check email uniqueness."
      });
    });
}



function validateStudentId(req, res, next) {
  students
    .findBy({
      id: req.params.id
    })
    .then(student => {
      if (student) {
        req.student = student;
        next();
      } else {
        res.status(400).json({
          error: "That student does not exist."
        });
      }
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({
        name,
        code,
        message,
        stack
      });
    });
}

function validateStudentBody(req, res, next) {
  Object.keys(req.body).length === 0 && req.body.constructor === Object
    ? res.status(400).json({
        error: "Missing request body."
      })
    : !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !req.body.professor_Id ||
      req.body.professor_Id !== parseInt(req.body.professor_Id)
    ? res.status(400).json({
        error:
          "firstName, lastName, email, and professor_Id are required. The professor_Id must be an integer."
      })
    : next();
}

function validateProjectBody(req, res, next) {
  const { name, deadline } = req.body;
  if (!name || !deadline) {
    res.status(400).json({
      error: "Please provide name and deadline for the project"
    });
  } else {
    next();
  }
}


function validateProfessorId(req, res, next) {
    users.findBy({
            id: req.body.professor_Id
        })
        .then(user => {
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(400).json({
                    error: "That professor does not exist."
                })
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
}

