var mongoose = require('mongoose');

var PointsSchema = new mongoose.Schema({
  topPiecesPoints: {
    type: Number,
    min:1,
    required: true
  },
  bottomPiecesPoints: {
    type: Number,
    min:1,
    required:true
  },
  underwearPiecesPoints: {
    type: Number,
    min:1,
    required:true
  },
  pointsPerVoucher: {
    type: Number,
    min:1,
    required:true
  },
  pointsPerEuroDonated: {
    type: Number,
    min:1,
    required:true
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Points', PointsSchema);