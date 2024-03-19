const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const register = async (req, res) => {
  const avatar = await cloudinary.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 140,
    crop: 'scale',
  });

  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(500).json({ message: 'Böyle bir kullanıcı zaten var.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  if (password.length < 6) {
    return res
      .status(500)
      .json({ message: 'Parolanız 6 karakterden küçük olamaz.' });
  }

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
    avatar: {
      public_id: avatar.public_id,
      url: avatar.secure_url,
    },
  });

  const token = await jwt.sign({ id: newUser._id }, 'SECRETTOKEN', {
    expiresIn: '1h',
  });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 1000),
  };

  res.status(201).cookie('token', token, cookieOptions).json({
    newUser,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(500).json({ message: 'Böyle bir kullanıcı bulunamadı.' });
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(500).json({ message: 'Parolanızını yanlış girdiniz' });
  }

  const token = await jwt.sign({ id: user._id }, 'SECRETTOKEN', {
    expiresIn: '1h',
  });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 1000),
  };

  res.status(201).cookie('token', token, cookieOptions).json({
    user,
    token,
  });
};

const logout = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now()),
  };

  res
    .status(200)
    .cookie('token', null, cookieOptions)
    .json({ message: 'Çıkış işlemi başarılı' });
};

const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(500).json({ message: 'Böyle bir kullanıcı bulunamadı' });
  }

  const resetToken = crypto.randomBytes(20).toString('hex');

  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  user.resetPasswordDate = Date.nov() + 15 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  const passwordUrl = `${req.protocol}://${req.get(
    'host'
  )}/reset/${resetToken}`;

  const message = `Şifreni sıfırlamak için gerekli bağlantı : ${passwordUrl}`;

  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      port: 465, // true for 465, false for other ports
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'password',
      },
      secure: true,
    });

    const mailData = {
      from: 'youremail@gmail.com', // sender address
      to: req.body.email, // list of receivers
      subject: 'Şifre Sıfırlama',
      text: message,
    };

    await transporter.sendMail(mailData);

    res.status(200).json({ message: 'Mailinizi kontrol ediniz.' });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordDate = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordDate: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(500).json({ message: 'Geçersiz Token' });
  }

  user.password = req.body.password;
  user.resetPasswordDate = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  const token = jwt.sign({ id: user._id }, 'SECRETTOKEN', { expiresIn: '1h' });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 1000),
  };

  res.status(200).cookie('token', token, cookieOptions).json({
    user,
    token,
  });
};

const userDetail = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ user });
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  userDetail,
};
