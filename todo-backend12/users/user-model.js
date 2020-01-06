const db = require('../database/db-config');

module.exports = {
    add,
    find,
    findBy,
    findById,
    findByUser,
};


function find() {
    return db('users').select('id', 'username', 'password')
}
function findByUser(){
    return db('users').select('id')
}

function findBy(filter){
    return db('users').where(filter)
}


async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}

function findById(id) {
    return db('users')
        .where( {id} )
        .first();
}
