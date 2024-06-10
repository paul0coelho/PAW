import { Component, OnInit } from '@angular/core';
import { Entity } from '../models/entity';
import { Router } from '@angular/router';
import { EntityService } from '../services/entity.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-entity-profile',
  templateUrl: './entity-profile.component.html',
  styleUrls: ['./entity-profile.component.css']
})

export class EntityProfileComponent implements OnInit {
  entity?: Entity;
  error?: string;

  constructor( 
    private router: Router,
    private sanitizer: DomSanitizer, 
    private entityService: EntityService
    
  ) { }

  ngOnInit(): void {
    this.loadEntityProfile();
  }
  private loadEntityProfile(): void {
    this.entityService.getEntityProfile().subscribe({
      next: (data: Entity) => {
        this.entity = data;
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

    this.entityService.getEntityImage(id).subscribe({
      next: (imageBlob: Blob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        if (this.entity) {
          this.entity.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      },
      error: (error: any) => {
        console.error('Error loading profile image:', error);
      }
    });
  }
}
