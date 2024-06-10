import { SafeUrl } from "@angular/platform-browser";

export class Donator{
    _id?:string;
    name?:String;
    phone?:Number;
    email?:String;
    address?:String;
    gainedPoints?:Number;
    vouchers?:Number;
    password?:String;
    canvasserCode?:String;
    updated_at?: Date;
    imageUrl?:SafeUrl;
}