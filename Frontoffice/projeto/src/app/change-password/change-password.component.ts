import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  redirectToProfile(): void {
    const userType = localStorage.getItem('userType')
    const profileRoute = userType === 'donator' ? '/profileDonator' : '/profileEntity';
    this.router.navigate([profileRoute]);
  }

  checkPasswords(): void {
    this.passwordMismatch = this.newPassword !== this.confirmPassword;
  }

  onSubmit(): void {
    if (this.passwordMismatch) {
      alert('As passwords não correspondem.');
      return;
    }

    const userType = localStorage.getItem('userType');

    if(!userType){
        alert('Tipo de utilizador não encontrado');
        return;
    }

    this.authService.changePassword(this.currentPassword, this.newPassword, userType).subscribe(
      response => {
        alert('Password alterada com sucesso!');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userType');
        this.router.navigate(['/login'])
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error => {
        alert('Erro ao alterar a password: ' + error.message);
      }
    );
  }
}