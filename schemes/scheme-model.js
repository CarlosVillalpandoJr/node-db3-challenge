const db = require("../data/db-config");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    remove,
    update
}

// find(), returns a promise that resolves to an array of all schemes in the database
function find() {
    return db('schemes')
}

// findById(id); expects a schemeid, resolve to a single scheme obj, on invalid id resolves to null
function findById(id) {
    return db('schemes')
        .where({ id })
        .first();
}

// findSteps(id) 
// select scheme_name, step_number, instructions from [schemes]
// join steps on scheme_id = schemes.id;

function findSteps(id) {
    return db('schemes')
        .select('steps.id', 'scheme_name', 'step_number', 'instructions')
        .join('steps', 'schemes.id', 'steps.scheme_id')
        .where('schemes.id', id)
}

// add(scheme)
function add(scheme) {
    return db('schemes')
    .insert(scheme)
    .then(ids => {
        return findById(ids[0])
    })
}

// remove(id)
function remove(id) {
    return db('schemes')
    .where({ id })
    .del();
}

// update(changes, id)
function update(changes, id) {
    return db('schemes')
    .where({ id })
    .update(changes)
}