import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-page',
  standalone: true,
  imports: [],
  templateUrl: './initial-page.component.html',
  styleUrl: './initial-page.component.css'
})
export class InitialPageComponent {

  constructor(private router: Router){}; 
  
  redirectToRegisterD(){
    this.router.navigate(['/registerDonator']);
  }
  redirectToRegisterE(){
    this.router.navigate(['/registerEntity']);
  }
  redirectToEntities(params: { showSelectButton: boolean }) {
    this.router.navigate(['/entities'], { queryParams: params });
  }
  redirectToSimulation() {
    this.router.navigate(['/registDonation'], { queryParams: { simulate: true } });
  }
  
}
