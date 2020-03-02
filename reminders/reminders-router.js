const router = require("express").Router();
const reminders = require('./reminders-model')

// Add a new reminder
router.post('/', (req, res) => {
    reminders.addReminder(req.body)
        .then(reminder => {
            res.status(201).json(reminder)
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

// Get a list of all reminders
router.get('/', (req, res) => {
    reminders.getLiterallyAll()
        .then(reminders => {
            res.status(200).json(reminders)
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

// Get a reminder's info by passing id in the req.params
router.get('/:id', (req, res) => {
    reminders.findBy({
            id: req.params.id
        })
        .then(reminder => {
            res.status(200).json(reminder)
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

// Update a reminder
router.put('/:id', (req, res) => {
    reminders.updateReminder({
            ...req.body,
            id: req.params.id
        })
        .then(reminder => {
            res.status(200).json({
                message: "Successfully updated reminder.",
                updatedReminder: reminder
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

// Delete a reminder
router.delete('/:id', (req, res) => {
    reminders.deleteReminder(req.params.id)
        .then(count => {
            res.status(200).json({
                message: `Successfully deleted ${count} reminder.`
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