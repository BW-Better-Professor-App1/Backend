const db = require('../database/dbConfig')

module.exports = {
    getLiterallyAll,
    getAll,
    findBy,
    addReminder,
    updateReminder,
    deleteReminder
}

function getLiterallyAll() {
    return db('Reminders')
}

function getAll(filter) {
    return db('Reminders').where(filter)
}

function findBy(filter) {
    return db('Reminders').where(filter).first()
}

async function addReminder(reminder) {
    const [id] = await db('Reminders').insert(reminder, "id")
    return findBy({
        id
    })
}

async function updateReminder(reminder) {
    await db('Reminders').where({
        id: reminder.id
    }).update({
        name: reminder.name,
        description: reminder.description,
        send_date: reminder.send_date,
        professor_Id: reminder.professor_Id

    })

    return findBy({
        id: reminder.id
    })
}

function deleteReminder(id) {
    return db('Reminders').where({
        id: id
    }).delete()
}