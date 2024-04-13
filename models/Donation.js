var mongoose = require('mongoose');

var DonationSchema = new mongoose.Schema({
  donator: {
    type: String,
    required: true
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
    required: true
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donations', DonationSchema);
