# Jungle Devs - Node Challenge #001

## Introduction

The main purpose of this project is give a brief structure of the core components of a backend application. It consists of a REST API that integrates with a PostgreSQL server through [Objection.js](https://vincit.github.io/objection.js/) ORM (using queries provided by [Knex.js](https://knexjs.org)) and provides basic CRUD actions on both Author and Articles endpoints. 

There is also an authentication middleware that provides basic privillege separation between admins and standard users.

## Instructions

Clone the project, navigate to the directory and install all dependencies

```
git clone https://github.com/potew/node-challenge-001
npm install
```

Create a .env(ironment) file in the root of the project containing the following pattern with parameters filled according to your setup:
```
HOST=
USER=
PASSWORD=
DATABASE=
ENGINE=postgresql
JWT_SECRET=
```

Setup a PostgreSQL installation and run the following commands to automatically create the tables
```
npx knex migrate:make migration
npx knex migrate:latest
```

Some seed files are available as an example. You can create your own by using
```
npx knex seed:make initial_data
```

And can populate the database with
```
npx knex seed:run
```

Finally, start the server with
```
npm start
```

## Endpoint reference

(to be continued)



## Original proposal

**Challenge goal**: The purpose of this challenge is to give an overall understanding of a backend application. You’ll be implementing a simplified version of news provider API. The concepts that you’re going to apply are:

- REST architecture;
- Authentication and permissions;
- Data modeling and migrations;
- SQL database;
- Query optimization;
- Serialization;
- Production builds.

**Target level**: This is an all around challenge that cover both juniors and experience devs based on the depth of how the concepts were applied.

**Final accomplishment**: By the end of this challenge you’ll have a production ready API.

## Acceptance criteria

- Clear instructions on how to run the application in development mode
- Clear instructions on how to create production builds
- A good API documentation or collection
- Models created using [Objection.js](https://vincit.github.io/objection.js/)
- Login API: `/api/login`
- Sign-up API: `/api/sign-up`
- Administrator restricted APIs:
  - CRUD `/api/admin/authors`
  - CRUD `/api/admin/articles`
- List article endpoint `/api/articles?category=:slug` with the following response:
```json
[
  {
    "author": {
      "name": "Author Name",
      "picture": "https://picture.url"
    },
    "category": "Category",
    "title": "Article title",
    "summary": "This is a summary of the article"
  },
  ...
]
```
- Article detail endpoint `/api/articles/:id` with different responses for anonymous and logged users:

    **Anonymous**
    ```json
    {
      "author": {
        "name": "Author Name",
        "picture": "https://picture.url"
      },
      "category": "Category",
      "title": "Article title",
      "summary": "This is a summary of the article",
      "firstParagraph": "<p>This is the first paragraph of this article</p>"
    }
    ```

    **Logged user**
    ```json
    {
      "author": {
        "name": "Author Name",
        "picture": "https://picture.url"
      },
      "category": "Category",
      "title": "Article title",
      "summary": "This is a summary of the article",
      "firstParagraph": "<p>This is the first paragraph of this article</p>",
      "body": "<div><p>Second paragraph</p><p>Third paragraph</p></div>"
    }
    ```


## Instructions to Run

- Database: `docker-compose up` will start the PostgreSQL DB
- `yarn dev` is configured to start the app.js using nodemon

