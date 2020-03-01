const db = require('../database/dbConfig')

module.exports = {
    getAll,
    findBy,
    addUser
}

function getAll() {
    return db('Professors').select('id', 'firstName', 'lastName', 'email')
}

function findBy(filter) {
    return db('Professors').where(filter).select('id', 'firstName', 'lastName', 'email').first()
}

async function addUser(user) {
    const [id] = await db('Professors').insert(user, "id")
    return findBy({
        id
    })
}