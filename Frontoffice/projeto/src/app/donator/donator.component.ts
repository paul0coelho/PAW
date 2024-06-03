import { Component, OnInit } from '@angular/core';
import { PlotlyService } from '../services/plotly.service';
import { DonationService } from '../services/donation.service';
import { Donation } from '../models/donation';

@Component({
  selector: 'app-donator',
  templateUrl: './donator.component.html',
  styleUrls: ['./donator.component.css']
})
export class DonatorComponent implements OnInit {
  donations?: Donation[];
  totalPoints: number = 0;
  totalDonations: number = 0;

  constructor(
    private plot: PlotlyService,
    private donationService: DonationService,
  ) { }

  ngOnInit(): void {

    this.donationService.getDonationsByDonatorId().subscribe((data: any) => {
      this.donations = data.donations;

      if (this.donations) {
        this.donations.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());

        const dates: string[] = [];
        const cumulativePoints: number[] = [];

        this.totalPoints = 0;
        this.totalDonations = this.donations.length;

        for (const donation of this.donations) {
          console.log(donation.gainedPoints);
          const date = new Date(donation.updated_at);
          dates.push(date.toLocaleDateString());
          this.totalPoints += Number(donation.gainedPoints);
          cumulativePoints.push(this.totalPoints);
        }

        this.plot.plotLine("Evolução do número de pontos", "plot", dates, cumulativePoints);
      }
    });
  }
}
