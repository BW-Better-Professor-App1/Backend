const router = require("express").Router();

const users = require('./users-model')
const students = require('../students/students-model')
const reminders = require('../reminders/reminders-model')

const {
    validateId,
    validateUpdateBody,
    validateUniqueEmail
} = require('../auth/validate_middleware')

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
    students.getAll({
            professor_Id: req.params.id
        })
        .then(students => {
            reminders.getAll({
                    professor_Id: req.params.id
                })
                .then(reminders => {
                    res.status(200).json({
                        ...req.user,
                        students: students,
                        reminders: reminders
                    })
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

// Get a user's list of
router.get('/:id/students', validateId, (req, res) => {
    students.getAll({
            professor_Id: req.params.id
        })
        .then(students => {
            res.status(200).json({
                students: students,
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

// Get a user's list of
router.get('/:id/reminders', validateId, (req, res) => {
    reminders.getAll({
            professor_Id: req.params.id
        })
        .then(reminders => {
            res.status(200).json({
                reminders: reminders,
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

// Update a user's info by passing id in params and other info in body
router.put('/:id', validateId, validateUpdateBody, validateUniqueEmail, (req, res) => {
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

// Delete a user
router.delete('/:id', validateId, (req, res) => {
    users.deleteUser(req.params.id)
        .then(count => {
            res.status(200).json({
                message: `Successfully deleted ${count} user.`
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