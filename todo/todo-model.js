const db = require('../database/db-config');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    findList,
    remove,
    findTitle
};


function find() {
    return db('todo').select('id', 'title', 'description', 'users_id')
}

function findList(id){
    return db('todo').select('title', 'description', "users_id").where({id})
}

function findBy(id) {
    return db('todo').select('title', 'description').where({ users_id: id })
}


function update(id, todo) {
    return db('todo')
        .where('id', Number(id))
        .update(todo);
}

function findTitle(title) {
    return db('todo')
        .where('title', title)
}

async function add(item) {
    const [id] = await db('todo').insert(item);
    return findById(id);
}

function findById(id) {
    return db('todo')
        .where({ id })
        .first();
}

function remove(title, id) {
    return db('todo')
        .where('title', title)
        .del()
        .then(() => { return findBy(id) })
}