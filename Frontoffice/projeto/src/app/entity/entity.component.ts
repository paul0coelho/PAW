import { Component, OnInit } from '@angular/core';
import { Entity } from '../models/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityService } from '../services/entity.service';

@Component({
  selector: 'app-entity',
  standalone: true,
  imports: [],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.css'
})

export class EntityComponent implements OnInit {
  entity?: Entity

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private entitiesService: EntityService
  ) { }

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.entitiesService.getEntity(idTemp).subscribe((data : Entity)=>{
      this.entity = data;
    })
  }


  navigateToEntities(): void {
    this.router.navigate(['/entities']);
  }
}
