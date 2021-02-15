const sha1 = require('sha1');
const Authors = require('../models/AuthorsModel');
const { getToken } = require('../service/tokenService');
const { checkLoginFields } = require('../middlewares/valiData');
const { createAuthor, findByEmail, updateAuthor } = require('../service/authorService');

const logAuthorIn = async (req, res) => {
  const { email, password } = req.body;
  const emptyFieldsMsg = checkLoginFields(email, password);
  
  if (emptyFieldsMsg) return res.status(400).json(emptyFieldsMsg);
  
  try {
    const authorData = await findByEmail(email);
    return authorData[0].toJSON().password == sha1(password)
    ? res.status(200).json({ token: getToken(authorData) })
    : res.status(400).json({ message: 'Invalid username or password!' });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const registerAuthor = async (req, res) => {
  const response = await createAuthor(req.body);

  return response.message
    ? res.status(response.code).json(response.message)
    : res.status(201).json({ message: 'Author was successfully inserted in the database.' });
};

const upsertAuthor = async (req, res) => {
  if (req.body.password) req.body.password = sha1(req.body.password);
  // If the user sets a new password, it needs to be hashed first!
  
  const response = await updateAuthor(req.params.id, req.body);

  return response.message
    ? res.status(response.code).json(response.message)
    : res.status(200).json({ message: 'Author was successfully updated.' });
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  if (req.author.isAdmin) {
    try {
      const deleted = await Authors.query().deleteById(id);
      deleted
      ? res.status(200).json({ message: `Author with id ${id} has been successfully deleted.` })
      : res.status(404).json({ message: `Id ${id} was not found in the database.` });
    } catch (e) {
      res.status(500).json({ message: e })
    }
  } else {
    res.status(401).json({ message: 'Operation denied for this user type.' })
  }
};

module.exports = {
  registerAuthor,
  upsertAuthor,
  logAuthorIn,
  deleteById,
};
