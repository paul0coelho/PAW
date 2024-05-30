import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  email: string;
  password:string;
  

  constructor(private router: Router, private authService: AuthService) { 
    this.email="";
    this.password="";
    
    
  }
  /*
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  */

  ngOnInit(): void {
  }

  login(): void{
    this.authService.login(this.email, this.password).subscribe((user : any)=>{
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/donator']);
      } else {
        alert('Erro no login!');
      }
    })
  }
 

  /*
  register(): void{
    this.authServive.register(this.email, this.password).subscribe((user : any)=>{
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/login']);
      } else {
        alert('Erro no login!');
      }
    })
  }
  */

  register(): void {
    this.router.navigate(['/register']);
  }

  redirectToHome() {
    this.router.navigate(['/welcomePage']);
  }
}
