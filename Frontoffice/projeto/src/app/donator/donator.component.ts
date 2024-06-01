import { Component, OnInit } from '@angular/core';
import { PlotlyService } from '../services/plotly.service';
import { DonationService } from '../services/donation.service';
import { ActivatedRoute } from '@angular/router';
import { Donation } from '../models/donation';

@Component({
  selector: 'app-donator',
  templateUrl: './donator.component.html',
  styleUrls: ['./donator.component.css']
})
export class DonatorComponent implements OnInit {
  donations?: Donation[];

  constructor(
    private plot: PlotlyService,
    private donationService: DonationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idTemp = this.route.snapshot.params['id'];
    this.donationService.getDonationsByDonatorId(idTemp).subscribe((data: any) => {
      this.donations = data.donations;

      if (this.donations) {
        this.donations.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());

        const dates: string[] = [];
        const cumulativePoints: number[] = [];

        let totalPoints = 0;
        for (const donation of this.donations) {
          const date = new Date(donation.updated_at);
          dates.push(date.toLocaleDateString());
          totalPoints += Number(donation.gainedPoints);
          cumulativePoints.push(totalPoints);
        }

        this.plot.plotLine("Evolução do número de pontos", "plot", dates, cumulativePoints);
      }
    });
  }
}
