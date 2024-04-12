var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
    unique:true
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admins', AdminSchema);