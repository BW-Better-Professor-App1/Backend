const router = require("express").Router();
const students = require('./students-model')
const projects = require('../projects/project-model')

const {
    validateStudentId,
    validateStudentBody,
    validateUniqueStudentEmail
} = require('../auth/validate_middleware')

// Add a student. Required in req.body: firstName, lastName, email, professor_Id
router.post('/', validateStudentBody, validateUniqueStudentEmail, (req, res) => {
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
    students.getLiterallyAll()
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
router.get('/:id', validateStudentId, (req, res) => {
    projects.getAll({
            student_Id: req.params.id
        })
        .then(projects => {
            res.status(200).json({
                ...req.student,
                projects: projects
            })
        })
})

// Update a student's info by passing id in params and other info in body
router.put('/:id', validateStudentId, validateStudentBody, validateUniqueStudentEmail, (req, res) => {
    students.updateStudent({
            ...req.body,
            id: req.params.id
        })
        .then(student => {
            res.status(200).json({
                message: "Successfully updated student.",
                updatedStudent: student
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
router.delete('/:id', validateStudentId, (req, res) => {
    students.deleteStudent(req.params.id)
        .then(count => {
            res.status(200).json({
                message: `Successfully deleted ${count} student.`
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