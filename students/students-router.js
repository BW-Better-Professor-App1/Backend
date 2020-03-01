const router = require("express").Router();
const students = require('./students-model')

router.get("/", (req, res) => {
    students.getAll()
        .then(students => {
            res.status(200).json(students)
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

router.post('/', (req, res) => {
    students.addStudent(req.body)
        .then(student => {
            res.status(201).json({
                message: "Successfully added a new student.",
                student
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