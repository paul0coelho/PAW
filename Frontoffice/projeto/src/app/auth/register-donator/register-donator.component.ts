import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register-donator',
  templateUrl: './register-donator.component.html',
  styleUrl: './register-donator.component.css'
})
export class RegisterDonatorComponent {
  name: string;
  email: string;
  phone: number | null;
  address: string;
  password:string;
  
  

  constructor(private router: Router, private registerService: RegisterService) { 
    this.password="";
    this.email="";
    this.name="";
    this.address="";
    this.phone= null;
    
  }
  ngOnInit(): void {
  }
  
  registerDonator(): void{
    
    if(this.phone){
    this.registerService.registerDonator(this.name, this.email, this.phone, this.address, this.password).subscribe((user : any)=>{
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/login']);
      } else {
        alert('Erro no login!');
      }
    })
  }
  }
  selectPage(){
    this.router.navigate(['/registerEntity']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}
