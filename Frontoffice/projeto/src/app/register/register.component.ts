import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name: string;
  email: string;
  phone: number;
  address: string;
  password:string;
  

  constructor(private router: Router, private registerServive: RegisterService) { 
    this.password="";
    this.email="";
    this.name="";
    this.address="";
    this.phone= 0;
    
  }
  ngOnInit(): void {
  }
  
  register(): void{
    
    this.registerServive.register(this.name, this.email, this.phone, this.address, this.password).subscribe((user : any)=>{
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/login']);
      } else {
        alert('Erro no login!');
      }
    })
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}
