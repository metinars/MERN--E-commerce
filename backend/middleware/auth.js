const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authenticationMid = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized request');
    }
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res
        .status(500)
        .json({ message: 'Erişim için giriş yapmalısınız' });
    }

    const decodedData = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decodedData) {
      return res.status(500).json({ message: 'Erişim tokeniniz geçersiz' });
    }

    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    res.status(500).json({ message: 'Hata' });
  }
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
