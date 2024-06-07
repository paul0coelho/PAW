var mongoose = require('mongoose');

var DonatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique:true
  },
  phone: {
    type: Number,
    min: 900000000,
    max: 999999999,
    unique:true,
    required:true
  },
  address: {
    type: String,
  },
  gainedPoints: {
    type: Number,
    min: 0,
    default: 0
  },
  vouchers:{
    type: Number,
    min: 0,
    default: 0
  },
  password: {
    type: String,
    required: true,
    unique:true
  },
  canvasserCode:{
    type: String,
    required:true
  },
  updated_at: { 
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donators', DonatorSchema);
