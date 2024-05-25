import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entity } from '../models/entity';
import { EntitiesService } from '../services/entities.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  entity?: Entity

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private entitiesService: EntitiesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(`Fetching entity with id: ${id}`);
    this.entitiesService.getEntity(id).subscribe(data => {
      console.log('Received entity data:', data);
      this.entity = data;
    }, error => {
      console.error('Error fetching entity:', error);
    });
  }

  navigateToEntities(): void {
    this.router.navigate(['/entities']);
  }
}
