require('dotenv').config();
const express = require('express');
const { authMiddleware } = require('./service/tokenService');
const postController = require('./controller/postController');
const authorController = require('./controller/authorController');

const app = express();
app.use(express.json());
// Used to make Express respond requests with jsons in their body.

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
app.get('/', (_req, response) => response.send());

app.post('/api/login', authorController.logAuthorIn);
app.post('/api/sign-up', authorController.registerAuthor);
app.get('/api/admin/authors/:id', authMiddleware, authorController.selectAuthorById);
app.put('/api/admin/authors/:id', authMiddleware, authorController.upsertAuthor);
app.delete('/api/admin/authors/:id', authMiddleware, authorController.deleteById);

app.get('/api/admin/articles', authMiddleware, postController.listAll);
app.post('/api/admin/articles', authMiddleware, postController.insertPost);
app.put('/api/admin/articles/:id', authMiddleware, postController.updatePost);
app.get('/api/admin/articles/:id', authMiddleware, postController.detailPost);
app.delete('/api/admin/articles/:id', authMiddleware, postController.erasePost);

app.get('/api/articles', postController.listByCategory);
app.get('/api/articles/:id', authMiddleware, postController.displayPost);
