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

  constructor(private donatorService: DonatorService, private router: Router){
    this.donator = new Donator();
  }

  ngOnInit(): void {
    this.donatorService.getDonatorProfile().subscribe(donator => {
      this.donator = donator;
    });

  }

  onSubmit(): void {

    this.donatorService.updateDonator(this.donator).subscribe(() =>{
      alert('Doador alterado com sucesso!');
      this.router.navigate(['/profileDonator'])
    }, error => {
      alert('Erro ao editar doador ' + error.message);
    });

  }

}
