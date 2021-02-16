const { validateAuthor } = require('../middlewares/valiData');
const Authors = require('../models/AuthorsModel');
const sha1 = require('sha1');

const genericErr = (code, message) => ({
  code,
  message,
});

const findByEmail = async (email) => {
  return await Authors.query()
    .select('id', 'email', 'password', 'isAdmin')
    .where('authors.email', email)
}

const createAuthor = async (data) => {
  const { name, email, password, picture, isAdmin } = data;
  const hasError = validateAuthor(data);
  const userExists = await findByEmail(email || '');

  if (hasError) return genericErr(400, hasError);
  if (userExists.length) return genericErr(409, { message: 'E-mail already exists' });

  try {
    return await Authors.query().insert({
      name,
      email,
      'password': sha1(password),
      picture,
      isAdmin
    });
  } catch (e) {
    return genericErr(400, e);
  }
};

const updateAuthor = async (id, data, admin) => {
  if (admin) {
    try {
      return await Authors.query().patchAndFetchById(id, data)
    } catch (e) {
      return genericErr(400, e);
    }
  } else {
    return genericErr(403, { message: 'Operation denied for this user type.' });
  }
};

const eraseAuthor = async (id, admin) => {
  if (admin) {
    try {
      return await Authors.query().deleteById(id);
    } catch (e) {
      return genericErr(400, e);
    }
  } else {
    return genericErr(403, { message: 'Operation denied for this user type.' });
  }
};

module.exports = {
  findByEmail,
  createAuthor,
  updateAuthor,
  eraseAuthor,
};
