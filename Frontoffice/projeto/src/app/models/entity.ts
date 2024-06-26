import { SafeUrl } from "@angular/platform-browser";

export class Entity {
    _id?: string;
    name?: String;
    description?: String;
    address?: String;
    email?: String;
    phone?: Number;
    accepted?: String;
    password?: String;
    updated_at?: Date;
    imageUrl?:SafeUrl;
  }
  