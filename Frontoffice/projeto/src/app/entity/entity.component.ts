import { Component, OnInit } from '@angular/core';
import { Donation } from '../models/donation';
import { DonationService } from '../services/donation.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-entity',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  donations?: Donation[];

  constructor(private donationService: DonationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDonationsByEntityId();
  }

  getDonationsByEntityId() {
    var idTemp = this.route.snapshot.params['id'];
    this.donationService.getDonationsByEntityId(idTemp).subscribe((data: any) => {
      this.donations = data.donations;
      console.log(this.donations);
    });
  
  }
}