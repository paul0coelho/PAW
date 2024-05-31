import { Component, OnInit } from '@angular/core';
import { Entity } from '../models/entity';
import { EntityService } from '../services/entity.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities() {
    this.entityService.getEntities().subscribe((data: any) => {
      this.entities = data.entities;
      console.log(this.entities);
    });
  }

  selectEntity(entity: Entity) {
    this.entityService.setSelectedEntity(entity);
    this.router.navigate(['/registDonation']);
  }
}
