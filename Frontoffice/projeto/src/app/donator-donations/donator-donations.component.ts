import { Component, OnInit } from '@angular/core';
import { Donation } from '../models/donation';
import { DonationService } from '../services/donation.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-donator-donations',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './donator-donations.component.html',
  styleUrls: ['./donator-donations.component.css']
})
export class DonatorDonationsComponent implements OnInit {
  donations?: Donation[];

  constructor(private donationService: DonationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDonationsByDonatorId();
  }

  getDonationsByDonatorId() {

    this.donationService.getDonationsByDonatorId().subscribe((data: any) => {
      this.donations = data.donations;
    });
  
  }
}
