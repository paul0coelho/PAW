import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonatorService } from '../services/donator.service';
import { Donator } from '../models/donator';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-donator-profile',
  templateUrl: './donator-profile.component.html',
  styleUrls: ['./donator-profile.component.css']
})
export class DonatorProfileComponent implements OnInit {
  donator?: Donator;
  error?: string;

  constructor(
    private router: Router, 
    private sanitizer: DomSanitizer,
    private donatorService: DonatorService
  ) {}

  ngOnInit(): void {
    this.loadDonatorProfile();
  }

  private loadDonatorProfile(): void {
    this.donatorService.getDonatorProfile().subscribe({
      next: (data: Donator) => {
        this.donator = data;
        console.log('Profile data:', data);
        if (data._id) {
          this.loadProfileImage(data._id);
        } else {
          console.error('Donator ID is undefined');
        }
      },
      error: (error: any) => {
        this.error = 'Failed to load donator profile';
        console.error('Error loading donator profile:', error);
        this.router.navigate(['/login']);
      }
    });
  }

  private loadProfileImage(id: string): void {
    if (!id) {
      console.error('Cannot load image, ID is undefined');
      return;
    }

    this.donatorService.getDonatorImage(id).subscribe({
      next: (imageBlob: Blob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        if (this.donator) {
          this.donator.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      },
      error: (error: any) => {
        console.error('Error loading profile image:', error);
      }
    });
  }
}
  