const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minLength: 6,
    },
    avatar: {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
      role: {
        type: String,
        default: 'user',
        required: true,
      },
      resetPasswordToken: String,
      resetPasswordDate: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
