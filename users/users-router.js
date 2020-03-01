const router = require("express").Router();
const bcrypt = require('bcryptjs')

const users = require('./users-model')
const students = require('../students/students-model')

// Get a list of all users and their info
router.get('/', (req, res) => {
    users.getAll()
        .then(users => {
            res.status(200).json({
                ...users
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

// Get a user's info by passing id in the req.params
router.get('/:id', (req, res) => {
    users.findBy({
            id: req.params.id
        })
        .then(user => {
            students.getAll({
                    professor_Id: req.params.id
                })
                .then(students => {
                    res.status(200).json({
                        ...user,
                        students
                    })
                })
        })
})

module.exports = router;