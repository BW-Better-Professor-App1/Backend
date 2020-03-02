const db = require('../database/dbConfig')

module.exports = {
    getAllCategories,
    findCategoryName,
}

function getAllCategories() {
    return db('Project-Categories')
}

function findCategoryName(id) {
    return db('Project-Categories').where({
        id: id
    }).first()
}