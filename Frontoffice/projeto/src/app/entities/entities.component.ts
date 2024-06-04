import { Component, OnInit } from '@angular/core';
import { Entity } from '../models/entity';
import { EntityService } from '../services/entity.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {
  entities: Entity[] = [];
  searchTermName: string = '';
  searchTermAddress: string = '';
  searchTermDescription: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

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
      this.entities = data.entities || [];
      if (this.entities.length > 0) {
        this.entities.forEach(entity => {
          let imageObservable;
          imageObservable = this.entityService.getEntityImage(entity._id);
          imageObservable.subscribe((imageBlob) => {
            const objectURL = URL.createObjectURL(imageBlob);
            entity.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
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

  filterEntities(): Entity[] {
    return this.entities.filter(entity =>
      entity.name.toLowerCase().includes(this.searchTermName.trim().toLowerCase()) &&
      entity.address.toLowerCase().includes(this.searchTermAddress.trim().toLowerCase()) &&
      entity.description.toLowerCase().includes(this.searchTermDescription.trim().toLowerCase())
    );
  }

  paginatedEntities(): Entity[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filterEntities().slice(startIndex, startIndex + this.itemsPerPage);
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
    return Math.ceil(this.filterEntities().length / this.itemsPerPage);
  }
}
