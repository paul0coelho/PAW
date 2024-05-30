import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Donation } from '../models/donation';
import { DonationService } from '../services/donation.service';

@Component({
  selector: 'app-donation-regist',
  templateUrl: './donation-regist.component.html',
  styleUrls: ['./donation-regist.component.css']
})
export class DonationRegistComponent implements OnInit {

  @Input() donation:Donation;
  
  date = new Date()

  constructor(private rest: DonationService) {
    this.donation = new Donation("", "", "", "info@unicef.pt", 912345678, 1, 1, 1, 0, this.date,"");
  }

  ngOnInit(): void {
  }

  add(): void {
    this.rest.registDonation(this.donation).subscribe((data: any) => {
      alert('Item added!');
    });
  }

}
