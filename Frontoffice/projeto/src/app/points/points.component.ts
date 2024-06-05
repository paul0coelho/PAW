import { Component, OnInit } from '@angular/core';
import { PointsService } from '../services/points.service';
import { ActivatedRoute } from '@angular/router';
import { DonatorService } from '../services/donator.service';
import { Donator } from '../models/donator';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {
  pointsNeededForVoucher: number = 0;
  totalPoints: number = 0;
  vouchersNumber: number = 0;
  donatorId: string = '';

  constructor(
    private pointsService: PointsService,
    private route: ActivatedRoute,
    private donatorService: DonatorService
  ) { }

  ngOnInit(): void {
    this.donatorService.getDonator().subscribe((data: Donator) => {
      this.totalPoints = Number(data.gainedPoints);
      this.vouchersNumber = Number(data.vouchers);
    });

    this.pointsService.getPoints().subscribe((data: any) => {
      this.pointsNeededForVoucher = data.pointsPerVoucher;
    });

  }

  exchangePoints(): void {
    if(this.totalPoints < this.pointsNeededForVoucher){
      alert('Pontos não suficientes para a troca')
    }   
    this.pointsService.exchangePointsForVoucher().subscribe(() => {
        alert('Pontos trocados por voucher com sucesso!');
      }, error => {
        alert('Erro ao trocar pontos por voucher.');
      });
  }
}
