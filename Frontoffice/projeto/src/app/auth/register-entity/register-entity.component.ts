import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register-entity',
  templateUrl: './register-entity.component.html',
  styleUrl: './register-entity.component.css'
})
export class RegisterEntityComponent {
  name: string;
  description:string;
  email: string;
  phone: number | null = null;
  address: string;
  password:string;

  constructor(private router: Router, private registerService: RegisterService) { 
    this.password="";
    this.email="";
    this.name="";
    this.description="";
    this.address="";
    this.phone= null;
    
  }

  ngOnInit(): void {
  }
  
  registerEntity(): void{
    
    if(this.phone){
    this.registerService.registerEntity(this.name,this.description, this.email, this.phone, this.address, this.password).subscribe((user : any)=>{
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/entities']);
      } else {
        alert('Erro ao registar!');
      }
    })
  }
  }
  selectPage(){
    this.router.navigate(['/registerDonator']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}
