var mongoose = require('mongoose');

var DonationSchema = new mongoose.Schema({
  donatorPhone: {
    type: Number,
    min: 900000000,
    max: 999999999,
    required:true
  },
  topPiecesNumber: {
    type: Number,
    required: true
  },
  bottomPiecesNumber: {
    type: Number,
    required: true
  },
  underwearPiecesNumber: {
    type: Number,
    required: true
  },
  gainedPoints:{
    type: Number,
    required: true,
    min: 1,
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donations', DonationSchema);
