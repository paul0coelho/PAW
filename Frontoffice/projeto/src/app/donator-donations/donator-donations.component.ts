import { Component, OnInit } from '@angular/core';
import { Donation } from '../models/donation';
import { DonationService } from '../services/donation.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-donator-donations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donator-donations.component.html',
  styleUrls: ['./donator-donations.component.css']
})
export class DonatorDonationsComponent implements OnInit {
  donations: Donation[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private donationService: DonationService) { }

  ngOnInit(): void {
    this.getDonationsByDonatorId();
  }

  getDonationsByDonatorId() {
    this.donationService.getDonationsByDonatorId().subscribe((data: any) => {
      this.donations = data.donations || [];
    });
  }

  paginatedDonations(): Donation[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.donations.slice(startIndex, startIndex + this.itemsPerPage);
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
    return Math.ceil(this.donations.length / this.itemsPerPage);
  }
}
