export class Donation {
    __id: String;
    phone: Number;
    topPiecesNumber: Number;
    bottomPiecesNumber: Number;
    underwearPiecesNumber: Number;
    gainedPoints: Number;
    updated_at: Date;

    constructor(__id: String, phone: Number, topPiecesNumber: Number, bottomPiecesNumber: Number, underwearPiecesNumber: Number, 
        gainedPoints: Number, updated_at: Date = new Date()) {
        this.__id = __id;
        this.phone = phone;
        this.topPiecesNumber = topPiecesNumber;
        this.bottomPiecesNumber = bottomPiecesNumber;
        this.underwearPiecesNumber = underwearPiecesNumber;
        this.gainedPoints = gainedPoints;
        this.updated_at = updated_at;
    }
}
