export class Admin{
    __id:String;
    name:String;
    email:String;
    phone:Number;
    password:String;
    updated_at: Date;

    constructor(__id:String, name:String, email:String, phone:Number, password:String, updated_at: Date = new Date()){
        this.__id = __id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.updated_at = updated_at;
    }

}