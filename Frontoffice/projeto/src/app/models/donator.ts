export class Donator{
    __id:String;
    name:String;
    phone:Number;
    address:String;
    gainedPoints:Number;
    vouchers:Number;
    password:String;
    canvasser:Boolean;
    updated_at: Date;

    constructor(__id:String, name:String, phone:Number, address:String, gainedPoints:Number, vouchers:Number, password:String,
        canvasser:Boolean, updated_at: Date = new Date()){
        this.__id = __id;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.gainedPoints = gainedPoints;
        this.vouchers = vouchers;
        this.password = password;
        this.updated_at = updated_at;
        this.canvasser = canvasser;
    }
}