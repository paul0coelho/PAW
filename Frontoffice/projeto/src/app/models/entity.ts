export class Entity {
    __id: String;
    name: String;
    description: String;
    address: String;
    email: String;
    phone: Number;
    updated_at: Date;
  
    constructor(__id: String, name: String, email: String, phone: Number, description: String, address: String,
      updated_at: Date = new Date()) {
      this.__id = __id;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.description = description;
      this.address = address;
      this.updated_at = updated_at;
    }
  }
  