var mongoose = require('mongoose');

var DonatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    min: 900000000,
    max: 999999999,
  },
  address: {
    type: String,
  },
  gainedPoints: {
    type: Number,
    min: 0,
    precision: 2,
  },
  updated_at: { 
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donators', DonatorSchema);
