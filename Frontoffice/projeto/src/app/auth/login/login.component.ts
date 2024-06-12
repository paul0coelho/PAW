import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string;

  constructor(private router: Router, private authService: AuthService) {
    this.email = "";
    this.password = "";
    this.errorMessage = "";
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        if (response && response.token) {
          localStorage.setItem('accessToken', JSON.stringify(response));
          if (response.userType === 'donator') {
            this.router.navigate(['/donator']);
          } else if (response.userType === 'entity') {
            this.router.navigate(['/entity']);
          } else {
            this.router.navigate(['/error']);
          }
        } else {
          this.errorMessage = 'Erro no login!';
        }
      },
      (error) => {
        this.errorMessage = 'Email ou password incorretos!';
      }
    );
  }

  register(): void {
    this.router.navigate(['/registerDonator']);
  }

  redirectToHome() {
    this.router.navigate(['/welcomePage']);
  }
}
