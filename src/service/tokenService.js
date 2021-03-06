const jwt = require('jsonwebtoken');
const { findByEmail } = require('./authorService');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

// JWT encoding
const getToken = (payload) => jwt.sign({ payload }, JWT_SECRET, jwtConfig);

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    req.author = { id: 0, isAdmin: false };
    next();
  } else {
    try {
      // JWT decoding & validation
      const { payload } = jwt.verify(token, JWT_SECRET);
      const { email, password } = payload[0];
      const authorModel = await findByEmail(email);
      const authorObj = authorModel[0].toJSON();

      if (!authorObj) return res.status(400).json({ message: 'Token is either expired or invalid' });

      if (authorObj.password == password) req.author = authorObj;
      // Contains both user/pass as well as the admin flag and...
      // callbacks the next middleware (route to the controller)
      next();
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }
};

module.exports = {
  getToken,
  authMiddleware,
};
