const users = require('../users//users-model')

module.exports = {
    validateId,
    validateBody,
    validateUniqueEmail
}

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