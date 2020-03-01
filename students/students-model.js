const db = require('../database/dbConfig')

module.exports = {
    getLiterallyAll,
    getAll,
    findBy,
    addStudent,
    updateStudent,
    deleteStudent
}

function getLiterallyAll() {
    return db('Students')
}

function getAll(filter) {
    return db('Students').where(filter)
}

function findBy(filter) {
    return db('Students').where(filter).first()
}

async function addStudent(student) {
    const [id] = await db('Students').insert(student, "id")
    return findBy({
        id
    })
}

async function updateStudent(student) {
    await db('Students').where({
        id: student.id
    }).update({
        firstName: student.firstName,
        lastName: student.lastName,
        professor_Id: student.professor_Id,
        email: student.email
    })

    return findBy({
        id: student.id
    })
}

function deleteStudent(id) {
    return db('Students').where({
        id: id
    }).delete()
}