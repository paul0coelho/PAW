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
  showPassword:boolean;

  constructor(private router: Router, private authServive: AuthService) { 
    this.password="";
    this.email="";
    this.showPassword=false;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  ngOnInit(): void {
  }

  login(): void{
    this.authServive.login(this.email, this.password).subscribe((user : any)=>{
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/']);
      } else {
        alert('Erro no login!');
      }
    })
  }
 

  register(): void{
    this.authServive.register(this.email, this.password).subscribe((user : any)=>{
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/']);
      } else {
        alert('Erro no login!');
      }
    })
  }
}
