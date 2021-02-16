const knexConfig = require('../knexfile');
const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex(knexConfig.development)

// Bind all Models to a knex instance.
Model.knex(knex);

class ArticlesModel extends Model {
  static get tableName() {
    return 'articles';
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return 'id';
  }

  // Optional JSON schema. For input validation only. 
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        author_id: { type: 'integer' },
        category: { type: 'string', minLength: 5, maxLength: 25 },
        title: { type: 'string', minLength: 2, maxLength: 60 },
        summary: { type: 'string', minLength: 0, maxLength: 255 },
        first_paragraph: { type: 'string', minLength: 10, maxLength: 255 },
        body: { type: 'string', minLength: 10, maxLength: 5000 },
      }
    };
  }
  // This object defines the relations to other models.
  static get relationMappings() {
    // Importing models here is a one way to avoid require loops.
    const Author = require('./AuthorsModel');

    return {
      posts: {
        relation: Model.BelongsToOneRelation,
        modelClass: Author,
        join: {
          from: 'articles.author_id',
          to: 'authors.id'
        }
      },
    };
  }
}

module.exports = ArticlesModel;
