var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  phone: {
    type: Number,
    min: 900000000,
    max: 999999999,
    required:true
  },
  password: {
    type: String,
    required: true,
    unique:true
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admins', AdminSchema);