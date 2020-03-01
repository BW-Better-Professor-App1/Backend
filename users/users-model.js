const db = require('../database/dbConfig')

module.exports = {
    getAll,
    findBy,
    findByIncludePassword,
    addUser,
    updateUser,
    deleteUser
}

function getAll() {
    return db('Professors').select('id', 'firstName', 'lastName', 'email')
}

function findBy(filter) {
    return db('Professors').where(filter).select('id', 'firstName', 'lastName', 'email').first()
}

function findByIncludePassword(filter) {
    return db('Professors').where(filter).first()
}

async function addUser(user) {
    const [id] = await db('Professors').insert(user, "id")
    return findBy({
        id
    })
}

async function updateUser(user) {
    const old_user = await findByIncludePassword({
        id: user.id
    })

    await db('Professors').where({
        id: user.id
    }).update({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: old_user.password
    })

    return findBy({
        id: user.id
    })
}

function deleteUser(id) {
    return db('Professors').where({
        id: id
    }).delete()
}