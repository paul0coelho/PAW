import { Component, OnInit } from '@angular/core';
import { Entity } from '../models/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityService } from '../services/entity.service';

@Component({
  selector: 'app-entity-profile',
  standalone: true,
  imports: [],
  templateUrl: './entity-profile.component.html',
  styleUrl: './entity-profile.component.css'
})

export class EntityProfileComponent implements OnInit {
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
  
}
