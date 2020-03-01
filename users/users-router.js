const router = require("express").Router();
const bcrypt = require('bcryptjs')

const users = require('./users-model')
const students = require('../students/students-model')

// Get a list of all users and their info
router.get('/', (req, res) => {
    users.getAll()
        .then(users => {
            res.status(200).json(users)
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
})

// Get a user's info by passing id in the req.params
router.get('/:id', validateId, (req, res) => {
    res.status(200).json({
        ...req.user,
        students: req.students
    })
})

// Update a user's info by passing id in params and other info in body
router.put('/:id', validateId, validateBody, validateUniqueEmail, (req, res) => {
    users.updateUser({
            ...req.body,
            id: req.params.id
        })
        .then(user => {
            res.status(200).json({
                message: "Successfully updated user.",
                updatedUser: user
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
})

module.exports = router;

function validateId(req, res, next) {
    users.findBy({
            id: req.params.id
        })
        .then(user => {
            if (user) {
                students.getAll({
                        professor_Id: req.params.id
                    })
                    .then(students => {
                        req.user = user;
                        req.students = students;
                        next();
                    })
            } else {
                res.status(400).json({
                    error: "That user does not exist."
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

function validateBody(req, res, next) {
    Object.keys(req.body).length === 0 && req.body.constructor === Object ?
        res.status(400).json({
            error: "Missing request body."
        }) :
        !req.body.firstName || !req.body.lastName || !req.body.email ?
        res.status(400).json({
            error: "firstName, lastName, and email are required."
        }) :
        next()

}

function validateUniqueEmail(req, res, next) {
    users.findBy({
            email: req.body.email
        })
        .then(user => {
            !user ? next() :
                parseInt(req.params.id) === user.id ?
                next() :
                res.status(400).json({
                    error: "That email is already in use."
                })

        })
        .catch(err => {
            res.status(500).json({
                error: "Couldn't check email uniqueness."
            })
        })
}