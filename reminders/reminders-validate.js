const reminders = require('./reminders-model')

module.exports = {
    validateRemindersBody,
    validateRemindersId
}

function validateRemindersBody(req, res, next) {
    Object.keys(req.body).length === 0 && req.body.constructor === Object ?
        res.status(400).json({
            error: "Missing request body."
        }) :
        !req.body.name || !req.body.send_date || !req.body.professor_Id || req.body.professor_Id !== parseInt(req.body.professor_Id) ?
        res.status(400).json({
            error: "name, send_date, and professor_Id are required. The professor_Id must be an integer. A description is optional."
        }) :
        next()
}

function validateRemindersId(req, res, next) {
    reminders.findBy({
            id: req.params.id
        })
        .then(reminder => {
            if (reminder) {
                req.reminder = reminder;
                next();
            } else {
                res.status(400).json({
                    error: "That reminder does not exist."
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