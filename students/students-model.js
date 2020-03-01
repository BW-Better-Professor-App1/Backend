const db = require('../database/dbConfig')

module.exports = {
    getAll,
    findBy,
    addStudent
}

function getAll() {
    return db('Students')
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