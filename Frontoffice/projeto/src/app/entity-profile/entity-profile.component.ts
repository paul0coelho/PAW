import { Component, OnInit } from '@angular/core';
import { Entity } from '../models/entity';
import { Router } from '@angular/router';
import { EntityService } from '../services/entity.service';

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
    private entityService: EntityService
  ) { }

  ngOnInit(): void {

    this.entityService.getEntityProfile().subscribe({
      next: (data: Entity) => {
        this.entity = data;
      },
      error: (error: any) => {
        this.error = 'Failed to load entity profile';
        console.error('Error loading entity profile:', error);
         this.router.navigate(['/login']);
      }
      
    })
  }
  
}
