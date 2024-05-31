import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Donation } from '../models/donation';
import { DonationService } from '../services/donation.service';
import { EntityService } from '../services/entity.service';
import { Entity } from '../models/entity';
import { Donator } from '../models/donator'

@Component({
  selector: 'app-donation-regist',
  templateUrl: './donation-regist.component.html',
  styleUrls: ['./donation-regist.component.css']
})
export class DonationRegistComponent implements OnInit {

  @Input() donation: Donation;

  selectedEntity: Entity;
  selectedDonator: Donator;
  date = new Date();

  constructor(private rest: DonationService, private restEntity: EntityService) {
    this.selectedDonator = new Donator("","",0,"",0,0,"");
    this.selectedEntity = new Entity("","","",0,"","");
    this.donation = new Donation("", this.selectedDonator, this.selectedEntity, 912345678, 1, 1, 1, 0, this.date, "entregue");
  }

  ngOnInit(): void {
    this.selectedEntity = this.restEntity.getSelectedEntity();
  }

  add(): void {
    if (this.selectedEntity) {
      this.donation.entityId._id = this.selectedEntity._id;
    }

    this.rest.registDonation(this.donation).subscribe((data: any) => {
      alert('Doação registrada com sucesso!');
    }, error => {
      alert('Erro ao registrar doação para a entidade ' + error.message);
    });
  }
}
