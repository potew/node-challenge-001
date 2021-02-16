# Jungle Devs - Node Challenge #001

## Introduction

The main purpose of this project is give a brief structure of the core components of a backend application. It consists of a REST API that integrates with a PostgreSQL server through [Objection.js](https://vincit.github.io/objection.js/) ORM (using queries provided by [Knex.js](https://knexjs.org)) and provides basic CRUD actions on both Author and Articles endpoints. 

There is also an authentication middleware that provides basic privilege separation between admins and standard users.

## Instructions

Clone the project, navigate to the directory and install all dependencies

```
git clone https://github.com/potew/node-challenge-001
npm install
```

Create a .env(ironment) file in the root of the project containing the following pattern with parameters filled according to your setup:
```
HOSTNAME=
PORT=
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
_Remember that the application will run on the port you specified in the [DOT]env file._

## Endpoint reference

All requests must be sent in raw JSON. Restricted APIs will require a token in the request header. This token is obtained by the login endpoint below.

### Login
`/api/login`

Example request

```json
{
  "email": "andre@gmail.com",
  "password": "unencryptedPass1"
}
```
which will return a token if the values match in the database. This token is valid for making requests up to 7 days. Here is an example on how to including it in your requests using [Postman](https://github.com/postmanlabs/postman-app-support/):
![Token-Auth example](src/public/HeaderExample.png)

### Author registration
`/api/sign-up`

```json
{
  "name": "Any Name Longer Than 8 characters",
  "picture": "path/to/the/file.ext",
  "email": "validemail@pattern.com",
  "password": "mustbeatleast6charactersofanytypes",
  "isAdmin": false
}
```
The e-mail address must be unique for each user. A successful request will render the following output:

```json
{
  "message": "Author was successfully inserted in the database."
}
```

### Author update and delete
PUT `/api/admin/authors/:id`

DELETE `/api/admin/authors/:id`

Where `:id` is the numeric id of the corresponding author entry.
Use the same format as in the registration. Not all parameters are required to be in the body of the `PUT` request. No parameters apart from the `id` are needed in the `DELETE` request. 
An admin token is needed for both operations, or else the following message will be returned:
```json
{
  "message": "Operation denied for this user type."
}
```

### Articles - private
**All endpoints in this section needs to have an admin token, or else the same message above will be returned.**

POST `/api/admin/articles` to create new posts a JSON in the format below. All fields are mandatory.
```json
{
  "category": "Finance",
  "title": "You know what's about to go down.",
  "summary": "RLC is the next Link. Get in while you still can.",
  "first_paragraph": ">Getting started",
  "body": "Has there ever been a /biz/ meetup? What would it look like?"
}
```
A successful request will return the post with its new assigned `id` as well as the `author_id` of the corresponding token.

**GET** `/api/admin/articles` will return a list of all posts.

**GET** `/api/admin/articles/:id` will return a list of the requested post.

**UPDATE** `/api/admin/articles/:id` will update the requested post.

**DELETE** `/api/admin/articles/:id` will delete the requested post.

### Articles - public
`/api/articles?category=:cat` will return all articles with categories matching the parameter, including its own author information. Example response:
```json
[
  {
    "name": "André",
    "picture": "resources/images/pepe0001.jpg",
    "category": "MemeCoins",
    "title": "Chainlink is magic",
    "summary": "I'm here to remind you that magic is real and that chainlink is the proof."
  },
  {
    "name": "Andrew",
    "picture": "resources/images/pepe0002.jpg",
    "category": "MemeCoins",
    "title": "You know what's about to go down.",
    "summary": "RLC is the next Link. Get in while you still can."
  },
]
```

### Article details - public and private
`/api/articles/:id` will return the corresponding article details, as well as the author name and picture. Logged on users are able to view the body section, regardless of their admin level.
```json
{
  "name": "Andréa",
  "picture": "resources/images/pepe0003.jpg",
  "category": "Technology",
  "title": "Monitor company shills are pissed off at CRT fans. They’re seething every time CRT is mentioned.",
  "summary": "Ever notice how lately the anti-CRT spam has reached a fever pitch? And it's just irrationally vitriolic. I get how some person might not want a CRT themselves, but what's the motivation for a person to get ANGRY at CRT users?",
  "first_paragraph": "Shills are pissed off that CRTs are now seen as a premium option and go for a premium price. They’re probably also angry third worlders who realize that they will never be able to afford a high-end CRT.",
  "body": "They both are subject to age.\n From personal experience, almost all the CRT TVs and monitors I've had needed a repair after 5 to 7 years:\n >Grundig 80s TV: failed 1996 \n hewlett packard 1994 OEM monitor: started having color issues around 2002, probable tube problems. Had a shitload of use.\n >LG 2005 CRT: Hasn't failed yet but had a weird problem with the original PC it was connected to, can no longer get signal from that particular machine. Every other PC/Monitor combo works.\n >Philips 2005 flat screen CRT: 2009.\n They had several repairs because they kept failing after that."
}
```

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

