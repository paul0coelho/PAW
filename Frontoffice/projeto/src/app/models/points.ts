export class Points {
  _id: string;
  topPiecesPoints: number;
  bottomPiecesPoints: number;
  underwearPiecesPoints: number;
  pointsPerVoucher: number;
  pointsPerEuroDonated: number;

  constructor(_id: string, topPiecesPoints: number, bottomPiecesPoints: number, underwearPiecesPoints: number, pointsPerVoucher: number
    ,pointsPerEuroDonated:number) {
    this._id = _id;
    this.topPiecesPoints = topPiecesPoints;
    this.bottomPiecesPoints = bottomPiecesPoints;
    this.underwearPiecesPoints = underwearPiecesPoints;
    this.pointsPerVoucher = pointsPerVoucher;
    this.pointsPerEuroDonated = pointsPerEuroDonated;
  }
}
