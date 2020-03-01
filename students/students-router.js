const router = require("express").Router();
const students = require('./students-model')

// Add a student. Required in req.body: firstName, lastName, email, professor_Id
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

// Get a list of all students
router.get('/', (req, res) => {
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

// Get a student's info by passing id in the req.params
router.get('/:id', (req, res) => {
    students.findBy({
            id: req.params.id
        })
        .then(student => {
            res.status(200).json(student)
        })
})

module.exports = router;