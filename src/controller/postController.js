const Posts = require('../models/ArticlesModel');
const { createPost, upsertPost } = require('../service/postService');

const listAll = async (_req, res) => {
  try {
    const postList = await Posts.query()

    res.status(200).json(postList);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const insertPost = async (req, res) => {
  const { id, isAdmin } = req.author;
  const response = await createPost({ author_id: id, ...req.body });
  
  if (isAdmin) {
  return response.author_id
    ? res.status(201).json(response)
    : res.status(400).json({ message: response });
  } else {
    res.status(401).json({ message: 'Operation denied for this user type.' })
  }
};

const updatePost = async (req, res) => {
  const { params, author, body } = req;

  if (author.isAdmin) {
    const response = await upsertPost(params.id, body);
    return response.id
      ? res.status(200).json(response)
      : res.status(400).json(response);
  } else {
    res.status(401).json({ message: 'Operation denied for this user type.' })
  }
};

const erasePost = async (req, res) => {
  const { params, author } = req;

  if (author.isAdmin) {
    const response = await Posts.query().deleteById(params.id);
    return response
      ? res.status(200).json(response)
      : res.status(404).json({ message: 'Article not found.' });
  } else {
    res.status(401).json({ message: 'Operation denied for this user type.' })
  }
};

const detailPost = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Posts.query().findById(id);
    return article
      ? res.status(200).json(article)
      : res.status(404).json({ message: 'Article not found' });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const displayPost = async (req, res) => {
  try {
    const article = await Posts.query()
      .findById(req.params.id)
      .select(
        'authors.name',
        'authors.picture',
        'articles.category',
        'articles.title',
        'articles.summary',
        'articles.first_paragraph',
        'articles.body',
      ).innerJoin('authors', 'articles.author_id', 'authors.id');
    const { body, ...mainInfo } = article;
    console.log(article);
    return article
      ? (req.author.id > 0)
        ? res.status(200).json(article)
        : res.status(200).json(mainInfo)
      : res.status(404).json({ message: 'Article not found' });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const listByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    const articles = await Posts.query()
      .select(
        'authors.name',
        'authors.picture',
        'articles.category',
        'articles.title',
        'articles.summary'
      ).join('authors', 'articles.author_id', '=', 'authors.id')
      .where('category', 'like', `%${category}%`);

    return articles.length
    ? res.status(200).json(articles)
    : res.status(404).json({ message: 'No articles meet the specified criteria.' })
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  insertPost,
  updatePost,
  erasePost,
  detailPost,
  displayPost,
  listAll,
  listByCategory,
};
