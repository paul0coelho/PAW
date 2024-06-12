import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlotlyService } from '../services/plotly.service';
import { DonationService } from '../services/donation.service';
import { Donation } from '../models/donation';
import { DonatorService } from '../services/donator.service';

@Component({
  selector: 'app-donator',
  templateUrl: './donator.component.html',
  styleUrls: ['./donator.component.css']
})
export class DonatorComponent implements OnInit {
  donations?: Donation[];
  totalPoints: number = 0;
  totalDonations: number = 0;
  actualPoints: Number = 0;

  constructor(
    private plot: PlotlyService,
    private donationService: DonationService,
    private donatorService: DonatorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.donationService.getDonationsByDonatorId().subscribe((data: any) => {
      this.donations = data.donations;
  
      this.donatorService.getDonator().subscribe((donator: any) => {
        if (donator) {
          this.actualPoints = donator.gainedPoints;
  
          if (this.donations) {
            this.donations.sort((a, b) => new Date(a.updated_at ?? 0).getTime() - new Date(b.updated_at ?? 0).getTime());
    
            const dates: string[] = [];
            const cumulativePoints: number[] = [];
    
            this.totalPoints = 0;
            this.totalDonations = this.donations.length;
    
            for (const donation of this.donations.filter(donation => donation.status === "aceite")) {
              console.log(donation.gainedPoints);
              const date = new Date(donation.updated_at ?? new Date());
              dates.push(date.toLocaleDateString());
              this.totalPoints += Number(donation.gainedPoints);
              cumulativePoints.push(this.totalPoints);
            }
    
            this.plot.plotLine("Evolução do número de pontos (através de doações)", "plot", dates, cumulativePoints);
          }
        }
      });
    });
  }
  
  encerrarSessao(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userType');
    this.router.navigate(['/login']);
  }
}
