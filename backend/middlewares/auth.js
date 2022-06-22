const jwt = require('jsonwebtoken');
require('dotenv').config();
const AuthentificationError = require('../errors/authentication-err');

// const JWT_SECRET_KEY = '1234567890';
const { NODE_ENV, JWT_SECRET_KEY } = process.env;
// eslint-disable-next-line consistent-return
const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    throw new AuthentificationError('Требуется авторизация!');
  }

  const token = auth.replace('Bearer ', '');
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    next(new AuthentificationError('Требуется авторизация!'));
  }

  req.user = decoded;
  next();
};

module.exports = { isAuthorized/* ,  generateToken */ };
