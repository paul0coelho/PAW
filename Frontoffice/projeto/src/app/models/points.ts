export class Points {
    __id: String;
    topPiecesPoints: Number;
    bottomPiecesPoints: Number;
    underwearPiecesPoints: Number;
    pointsPerVoucher: Number;
    updated_at: Date;
  
    constructor(__id: String, topPiecesPoints: Number, bottomPiecesPoints: Number, underwearPiecesPoints: Number,
        pointsPerVoucher: Number, updated_at: Date = new Date()) {
      this.__id = __id;
      this.topPiecesPoints = topPiecesPoints;
      this.bottomPiecesPoints = bottomPiecesPoints;
      this.underwearPiecesPoints = underwearPiecesPoints;
      this.pointsPerVoucher = pointsPerVoucher;
      this.updated_at = updated_at;
    }
  }
  