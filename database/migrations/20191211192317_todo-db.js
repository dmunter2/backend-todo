
exports.up = function(knex) {
  return knex.schema
  
  
  .createTable('users', users => {
      users.increments('id');
            
      users.string('username', 128).notNullable().unique();

      users.string('password', 128).notNullable();
  })

  .createTable('todo', todo => {
      todo.increments('id');

      todo.string('title', 128).notNullable();

      todo.string('description');

      todo.string('users_id').notNullable().unsigned().references('users.id')

  })

  
  
  
  
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('todo')
};
