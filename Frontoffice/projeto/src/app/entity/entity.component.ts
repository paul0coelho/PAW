import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entity } from '../models/entity';
import { EntitiesService } from '../services/entities.service';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  entity?: Entity;

  constructor(private route: ActivatedRoute, private entitiesService: EntitiesService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.entitiesService.getEntity(id).subscribe(data => {
      this.entity = data;
    });
  }
}
