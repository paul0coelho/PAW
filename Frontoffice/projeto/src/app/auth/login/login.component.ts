import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';


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

  ngOnInit(): void {
  }

 login(): void {
  this.authService.login(this.email, this.password).subscribe((response: any) => {
    if (response && response.token) {
      localStorage.setItem('currentUser', JSON.stringify(response));
      if (response.userType === 'donator') {
        this.router.navigate(['/donator']);
      } else if (response.userType === 'entity') {
        this.router.navigate(['/entities']); 
      } else {
        this.router.navigate(['/error']); 
      }
    } else {
      alert('Erro no login!');
    }
  });
}
 

  register(): void {
    this.router.navigate(['/registerDonator']);
  }

  redirectToHome() {
    this.router.navigate(['/welcomePage']);
  }
}
