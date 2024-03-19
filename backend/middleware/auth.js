const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authenticationMid = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(500).json({ message: 'Erişim için giriş yapmalısınız' });
  }

  const decodedData = jwt.verify(token, 'SECRETTOKEN');

  if (!decodedData) {
    return res.status(500).json({ message: 'Erişim tokeniniz geçersiz' });
  }

  req.user = await User.findById(decodedData.id);

  next();
};

const roleChecked = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req, user.role)) {
      return res
        .status(500)
        .json({ messgae: 'Giriş için izniniz bulunmamaktadır' });
    }
    next();
  };
};

module.exports = { authenticationMid, roleChecked };
