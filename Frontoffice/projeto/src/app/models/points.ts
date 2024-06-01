export class Points {
  _id: string;
  topPiecesPoints: number;
  bottomPiecesPoints: number;
  underwearPiecesPoints: number;
  pointsPerVoucher: number;

  constructor(_id: string, topPiecesPoints: number, bottomPiecesPoints: number, underwearPiecesPoints: number, pointsPerVoucher: number) {
    this._id = _id;
    this.topPiecesPoints = topPiecesPoints;
    this.bottomPiecesPoints = bottomPiecesPoints;
    this.underwearPiecesPoints = underwearPiecesPoints;
    this.pointsPerVoucher = pointsPerVoucher;
  }
}
