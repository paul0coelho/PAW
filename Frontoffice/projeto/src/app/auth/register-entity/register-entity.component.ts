import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { Entity } from '../../models/entity';

@Component({
  selector: 'app-register-entity',
  templateUrl: './register-entity.component.html',
  styleUrls: ['./register-entity.component.css']
})
export class RegisterEntityComponent {
  entity: Entity = new Entity();
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
    if (this.entity.phone) {
      console.log(this.entity)
      console.log(this.selectedFile)
      this.registerService.registerEntity(this.entity, this.selectedFile).subscribe(
        (response) => {
          console.log('Instituição registada com sucesso:', response);
          this.router.navigate(['/welcomePage']);
        },
        (error) => {
          console.error('Erro ao registar instituição:', error);
        }
      );
    }
  }
}
