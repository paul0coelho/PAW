import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Donation } from '../models/donation';
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

  @Input() donation: Donation;

  selectedEntity: Entity;
  selectedDonator: Donator;
  points: Points | null;
  date = new Date();
  simulatedPoints: number | null = null;
  isSimulation: boolean = false;

  constructor(
    private donationService: DonationService, 
    private entityService: EntityService, 
    private pointsService: PointsService, 
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.selectedDonator = new Donator("","",0,"",0,0,"",false);
    this.selectedEntity = new Entity("","","",0,"","","",undefined,"",);
    this.points = new Points("",0,0,0,0,0)
    this.donation = new Donation("", this.selectedDonator, this.selectedEntity, 912345678, 1, 1, 1, 0, 0, this.date, "entregue");
  }

  ngOnInit(): void {
    this.selectedEntity = this.entityService.getSelectedEntity();
    this.route.queryParams.subscribe(params => {
      this.isSimulation = params['simulate'] === 'true';
    });
  }

  add(): void {
    if (this.selectedEntity) {
      this.donation.entityId._id = this.selectedEntity._id;
    }

    this.donationService.registDonation(this.donation).subscribe((data: any) => {
      alert('Doação registrada com sucesso!');
    }, error => {
      alert('Erro ao registrar doação para a entidade ' + error.message);
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
