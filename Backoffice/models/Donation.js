var mongoose = require('mongoose');

var DonationSchema = new mongoose.Schema({
  donatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donators',
    required: true
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entities',
    required: true
  },
  phone: {
    type: Number,
    min: 900000000,
    max: 999999999,
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
  gainedPoints: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['recebido', 'entregue', 'extraviado'],
    required: true
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Donations', DonationSchema);
