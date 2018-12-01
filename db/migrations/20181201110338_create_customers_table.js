exports.up = function(knex, Promise) {
    return knex.schema.createTable('customers', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('address1').notNullable();
        table.string('address2').nullable();
        table.string('city').notNullable();
        table.string('province').notNullable();
        table.string('zip').notNullable();
        table.string('country').notNullable();
        table.string('phone').notNullable();
        table.string('email').notNullable();
        table.timestamp('timestamp').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('customers');
};
