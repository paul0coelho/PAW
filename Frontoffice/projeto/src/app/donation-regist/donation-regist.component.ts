import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Donation } from '../models/donation';
import { DonatorService } from '../services/donator.service';
import { DonationService } from '../services/donation.service';
import { EntityService } from '../services/entity.service';
import { PointsService } from '../services/points.service';
import { Entity } from '../models/entity';
import { Donator } from '../models/donator';
import { Points } from '../models/points';

@Component({
  selector: 'app-donation-regist',
  templateUrl: './donation-regist.component.html',
  styleUrls: ['./donation-regist.component.css']
})
export class DonationRegistComponent implements OnInit {
  donation: Donation;
  selectedEntity: Entity;
  selectedDonator: Donator;
  points: Points | null;
  date = new Date();
  simulatedPoints: number | null = null;
  isSimulation: boolean = false;
  selectedFile: File;

  constructor(
    private donationService: DonationService, 
    private entityService: EntityService, 
    private pointsService: PointsService,
    private donatorService: DonatorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.selectedDonator = new Donator();
    this.selectedEntity = new Entity();
    this.points = new Points()
    this.donation = new Donation("", this.selectedDonator, this.selectedEntity, 912345678, "",1, 1, 1, 0, 0, this.date, "em espera");
    const defaultContent = new Blob(['Conteúdo inicial'], { type: 'text/plain' });
    this.selectedFile = new File([defaultContent], 'arquivoInicial.txt', { type: 'text/plain' });
  }

  ngOnInit(): void {
    this.selectedEntity = this.entityService.getSelectedEntity();
    this.donatorService.getDonator().subscribe((data:any)=> {
      this.donation.phone = data.phone;

    })
    this.route.queryParams.subscribe(params => {
      this.isSimulation = params['simulate'] === 'true';
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  add(): void {
    if (this.selectedEntity && this.selectedEntity.name) {
      this.donation.entityId._id = this.selectedEntity._id;
      this.donation.entityName = this.selectedEntity.name;
      console.log(this.donation)
    }

    this.donationService.registDonation(this.donation, this.selectedFile).subscribe((data: any) => {
      alert('Doação registada com sucesso!');
    }, error => {
      alert('Erro ao registar doação para a entidade ' + error.message);
    });
  }

  simulatePoints(): void {
    this.pointsService.getPoints().subscribe((pointsData: Points) => {
      const topPoints = Number(pointsData.topPiecesPoints) * Number(this.donation.topPiecesNumber);
      const bottomPoints = Number(pointsData.bottomPiecesPoints) * Number(this.donation.bottomPiecesNumber);
      const underwearPoints = Number(pointsData.underwearPiecesPoints) * Number(this.donation.underwearPiecesNumber);
      const moneyPoints = Number(pointsData.pointsPerEuroDonated) * Number(this.donation.moneyDonated);
      this.simulatedPoints = topPoints + bottomPoints + underwearPoints + moneyPoints;
    }, error => {
      console.error('Erro ao obter pontos: ', error);
    });
  }

  submitDonationForm(): void {
    if (!this.isSimulation) {
      this.add();
    }
  }

  redirectToEntities(params: { showSelectButton: boolean }) {
    this.router.navigate(['/entities'], { queryParams: params });
  }
}
