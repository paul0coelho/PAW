import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonatorService } from '../services/donator.service';
import { Donator } from '../models/donator';

@Component({
  selector: 'app-donator-profile',
  templateUrl: './donator-profile.component.html',
  styleUrls: ['./donator-profile.component.css']
})

export class DonatorProfileComponent implements OnInit {
  donator?:Donator;
  error?: string;

  constructor(
    private router: Router, 
    private donatorService: DonatorService
  ) { }

  ngOnInit(): void {
    this.donatorService.getDonatorProfile().subscribe({
      next: (data: Donator) => {
        this.donator = data;
      },
      error: (error: any) => {
        this.error = 'Failed to load donator profile';
        console.error('Error loading donator profile:', error);
         this.router.navigate(['/login']);
      }
    });
  }

}
