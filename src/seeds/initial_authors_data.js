exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(() =>
      // Inserts seed entries
      knex('authors').insert([
        {
          id: 1,
          name: 'André',
          picture: 'resources/images/pepe0001.jpg',
          email: 'andre@gmail.com',
          password: 'unencryptedPass1',
          isAdmin: true,
        },
        {
          id: 2,
          name: 'Andréa',
          picture: 'resources/images/pepe0002.jpg',
          email: 'andrea@gmail.com',
          password: 'unencryptedPass2',
          isAdmin: false,
        },
        {
          id: 3,
          name: 'Andréia',
          picture: 'resources/images/pepe0003.jpg',
          email: 'andreia@gmail.com',
          password: 'plainTextHere',
          isAdmin: false,
        },
        {
          id: 4,
          name: 'Andrio',
          picture: 'resources/images/pepe0004.jpg',
          email: 'andrio@gmail.com',
          password: '4580294868975',
          isAdmin: false,
        },
      ]));
};
