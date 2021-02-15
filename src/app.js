const express = require('express');
const postController = require('./controller/postController');
const authorController = require('./controller/authorController');
const { authMiddleware } = require('./service/tokenService');


const app = express();
app.use(express.json());
// Used to make Express respond requests with jsons on their body.

app.listen(3000, () => console.log('Server listening on port 3000!'));
app.get('/', (_req, response) => response.send());

app.post('/api/login', authorController.logAuthorIn);
app.post('/api/sign-up', authorController.registerAuthor);
app.put('/api/admin/authors/:id', authMiddleware, authorController.upsertAuthor);
app.delete('/api/admin/authors/:id', authMiddleware, authorController.deleteById);

app.get('/api/admin/articles', authMiddleware, postController.listAll);
app.post('/api/admin/articles', authMiddleware, postController.insertPost);
app.put('/api/admin/articles/:id', authMiddleware, postController.updatePost);
app.get('/api/admin/articles/:id', authMiddleware, postController.detailPost);
app.delete('/api/admin/articles/:id', authMiddleware, postController.erasePost);

app.get('/api/articles', postController.listByCategory);
app.get('/api/articles/:id', authMiddleware, postController.displayPost);
