import { Component } from '@angular/core';
import { Donator } from '../models/donator';
import { DonatorService } from '../services/donator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donator-edit',
  templateUrl: './donator-edit.component.html',
  styleUrls: ['./donator-edit.component.css']
})
export class DonatorEditComponent {
  donator: Donator;
  selectedFile: File | undefined;

  constructor(private donatorService: DonatorService, private router: Router){
    this.donator = new Donator();
    
  }

  ngOnInit(): void {
    this.donatorService.getDonatorProfile().subscribe(donator => {
      this.donator = donator;
    });
  }
  
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    
    if (this.selectedFile) {
      this.donatorService.updateDonator(this.donator, this.selectedFile).subscribe(() => {
        alert('Doador alterado com sucesso!');
        this.router.navigate(['/profileDonator']);
      }, error => {
        alert('Erro ao editar doador: ' + error.message);
      });
    } else {
      this.donatorService.updateDonator2(this.donator).subscribe(() => {
        alert('Doador alterado com sucesso!');
        this.router.navigate(['/profileDonator']);
      }, error => {
        alert('Erro ao editar doador: ' + error.message);
      });
    }
  }
}
