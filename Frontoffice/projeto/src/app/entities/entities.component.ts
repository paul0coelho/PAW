import { Component, OnInit } from '@angular/core';
import { Entity } from '../models/entity';
import { EntityService } from '../services/entity.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-entities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {
  entities?: Entity[];

  constructor(
    private entityService: EntityService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities() {
    this.entityService.getEntities().subscribe((data: any) => {
      this.entities = data.entities;
      if (this.entities) {
        this.entities.forEach(entity => {
          let imageObservable;
          imageObservable = this.entityService.getEntityImage(entity._id);
          imageObservable.subscribe((imageBlob) => {
            const objectURL = URL.createObjectURL(imageBlob);
            entity.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            console.log(entity.imageUrl)
          });
        });
      }
    }, error => {
      console.error('Error while fetching entities', error);
    });
  }

  selectEntity(entity: Entity) {
    this.entityService.setSelectedEntity(entity);
    this.router.navigate(['/registDonation']);
  }
}
