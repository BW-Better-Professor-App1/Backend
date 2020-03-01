const db = require('../database/dbConfig')

module.exports = {
    getLiterallyAll,
    getAll,
    findBy,
    addProject
}

function getLiterallyAll() {
    return db('Projects')
}

function getAll(filter) {
    return db('Projects').where(filter)
}

function findBy(filter) {
    return db('Projects').where(filter).first()
}

async function addProject(project) {
    const [id] = await db('Projects').insert(project, "id")
    return findBy({
        id
    })
}