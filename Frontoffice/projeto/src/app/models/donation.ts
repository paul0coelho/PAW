export class Donation {
    __id: String;
    donatorId:String;
    entityId:String;
    phone: Number;
    topPiecesNumber: Number;
    bottomPiecesNumber: Number;
    underwearPiecesNumber: Number;
    gainedPoints: Number;
    updated_at: Date;

    constructor(__id: String, donatorId:String, entityId:String, phone: Number, topPiecesNumber: Number, bottomPiecesNumber: Number, 
        underwearPiecesNumber: Number, gainedPoints: Number, updated_at: Date) {
        this.__id = __id;
        this.donatorId = donatorId;
        this.entityId = entityId;
        this.phone = phone;
        this.topPiecesNumber = topPiecesNumber;
        this.bottomPiecesNumber = bottomPiecesNumber;
        this.underwearPiecesNumber = underwearPiecesNumber;
        this.gainedPoints = gainedPoints;
        this.updated_at = updated_at;
    }
}
