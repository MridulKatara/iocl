const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: String,
  email: String,
  mobile: String,
  position: String,
  role: { type: String, enum: ['admin', 'worker'] },
  residentialAddress: String,
  gender: { type: String, enum: ['male', 'female'] },
  password: String,
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
