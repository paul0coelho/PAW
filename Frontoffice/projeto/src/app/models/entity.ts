import { SafeUrl } from "@angular/platform-browser";

export class Entity {
    _id: String;
    name: String;
    description: String;
    address: String;
    email: String;
    phone: Number;
    accepted: String;
    updated_at: Date;
    imageUrl:SafeUrl;
  
    constructor(_id: String, name: String, email: String, phone: Number, description: String, address: String, accepted:String,
      updated_at: Date = new Date(), imageUrl:SafeUrl) {
      this._id = _id;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.description = description;
      this.address = address;
      this.updated_at = updated_at;
      this.imageUrl = imageUrl;
      this.accepted = accepted;
    }
  }
  