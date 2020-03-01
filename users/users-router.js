const router = require("express").Router();

const users = require('./users-model')

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
    res.status(200).json({
        ...req.user,
        students: req.students
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
})

module.exports = router;