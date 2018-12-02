exports.up = function(knex, Promise) {
    return knex.schema.createTable('loginattempts', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('video_path').notNullable();
        table.timestamp('timestamp').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('loginattempts');
};
