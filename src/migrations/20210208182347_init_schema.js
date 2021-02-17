exports.up = (knex) => knex.schema
  .createTable('authors', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('password');
    table.string('picture');
    table.bool('isAdmin');
  })
  .createTable('articles', (table) => {
    table.increments('id').primary();

    table
      .integer('author_id')
      .unsigned()
      .references('id')
      .inTable('articles')
      .onDelete('SET NULL')
      .index();

    table.string('category');
    table.string('title');
    table.string('summary');
    table.string('first_paragraph');
    table.text('body');
  });

exports.down = (knex) => knex.schema
  .dropTableIfExists('authors')
  .dropTableIfExists('articles');
