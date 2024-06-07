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
  selectedFile: File;

  constructor(private router: Router, private registerService: RegisterService) { 
    this.password="";
    this.email="";
    this.name="";
    this.description="";
    this.address="";
    this.phone= null;
    const defaultContent = new Blob(['Conteúdo inicial'], { type: 'text/plain' });
    this.selectedFile = new File([defaultContent], 'arquivoInicial.txt', { type: 'text/plain' });
    
  }

  ngOnInit(): void {
  }
  
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      this.selectedFile=file;
    }
  }


  registerEntity(): void{
    
    if(this.phone){
    this.registerService.registerEntity(this.name,this.description, this.email, this.phone, this.address, this.password, this.selectedFile).subscribe((user : any)=>{
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
