const knexConfig = require('../knexfile');
const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex(knexConfig.development)

// Bind all Models to a knex instance.
Model.knex(knex);

class AuthorModel extends Model {
  static get tableName() {
    return 'authors';
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
      // required: ['firstName', 'lastName'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 2, maxLength: 255 },
        email: { type: 'string', minLength: 5, maxLength: 255 },
        password: { type: 'string', minLength: 6, maxLength: 255 },
        picture: { type: 'string', minLength: 5, maxLength: 255 },
        isAdmin: { type: 'boolean' }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    // Importing models here is a one way to avoid require loops.
    const Article = require('./ArticlesModel');

    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Article,
        join: {
          from: 'authors.id',
          to: 'articles.author_id'
        }
      },
    };
  }
}

module.exports = AuthorModel;
