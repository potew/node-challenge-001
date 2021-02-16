require('dotenv').config();

const { ENGINE, HOST, USER, PASSWORD, DATABASE } = process.env;

module.exports = {
  development: {
    client: ENGINE,
    useNullAsDefault: true,
    connection: {
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE
    }
  },
  production: {
    client: ENGINE,
    connection: {
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
