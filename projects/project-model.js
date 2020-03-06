const db = require("../database/dbConfig");

module.exports = {
  getLiterallyAll,
  getAll,
  findBy,
  addProject,
  update,
  remove
};

function getLiterallyAll() {
  return db("Projects");
}

function getAll(filter) {
  return db("Projects").where(filter);
}

function findBy(id) {
  return db("Projects")
    .where({ id })
    .first();
}

async function addProject(project) {
  const [id] = await db("Projects").insert(project, "id");
  return findBy(id);
}

function update(changes, id) {
  return db("Projects")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("Projects")
    .where({ id })
    .del();
}
