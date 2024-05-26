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
    var idTemp = this.route.snapshot.params['id'];
    this.entitiesService.getEntity(idTemp).subscribe((data : Entity)=>{
      this.entity = data;
    })
  }


  navigateToEntities(): void {
    this.router.navigate(['/entities']);
  }
}
