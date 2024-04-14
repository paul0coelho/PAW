var mongoose = require('mongoose');

var EntitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  phone: {
    type: Number,
    min: 9000000000,
    max: 9999999999,
    required: true,
    unique:true
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Entities', EntitySchema);