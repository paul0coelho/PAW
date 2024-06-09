import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { Donator } from '../../models/donator';

@Component({
  selector: 'app-register-donator',
  templateUrl: './register-donator.component.html',
  styleUrls: ['./register-donator.component.css']
})
export class RegisterDonatorComponent {
  donator: Donator = new Donator();
  selectedFile: File;

  constructor(private registerService: RegisterService, private router: Router) {
    const defaultContent = new Blob(['Conteúdo inicial'], { type: 'text/plain' });
    this.selectedFile = new File([defaultContent], 'arquivoInicial.txt', { type: 'text/plain' });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  submitForm(): void {
    if (this.donator.phone) {
      console.log(this.donator);
      console.log(this.selectedFile);
      this.registerService.registerDonator(this.donator, this.selectedFile).subscribe(
        (response) => {
          console.log('Doador registado com sucesso:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erro ao registar doador:', error);
        }
      );
    }
  }
}
