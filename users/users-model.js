const db = require('../database/dbConfig')

module.exports = {
    getAll,
    findBy,
    addUser,
    updateUser
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

async function updateUser(user) {
    const same_password = await db('Professors').where({
        id: user.id
    }).select('password')

    await db('Professors').where({
        id: user.id
    }).update({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: same_password
    })

    return findBy({
        id: user.id
    })
}