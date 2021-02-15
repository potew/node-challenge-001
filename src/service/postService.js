const { validatePostData } = require('../middlewares/valiData');
const Posts = require('../models/ArticlesModel');

const createPost = async (data) => {
  const error = validatePostData(data);
  if (error) return error;

  try {
    return await Posts.query().insert(data);
  } catch (e) {
    return e;
  }
};

const upsertPost = async (id, data) => {
  try {
    return await Posts.query().patchAndFetchById(id, data);
  } catch (e) {
    return e;
  }
};

module.exports = {
  createPost,
  upsertPost,
};
