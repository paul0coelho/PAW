import { Component, OnInit } from '@angular/core';
import { Donation } from '../models/donation';
import { DonationService } from '../services/donation.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  donations?: Donation[];
  currentPage: number = 1;
  itemsPerPage: number = 5;

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

  paginatedDonations(): Donation[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.donations ? this.donations.slice(startIndex, startIndex + this.itemsPerPage) : [];
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return this.donations ? Math.ceil(this.donations.length / this.itemsPerPage) : 0;
  }
}
