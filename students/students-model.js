const db = require('../database/dbConfig')

module.exports = {
    getLiterallyAll,
    getAll,
    findBy,
    addStudent
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