import { Component, OnInit } from '@angular/core';
import { Entity } from '../models/entity';
import { EntityService } from '../services/entity.service';


@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {
  entities?: Entity[];

  constructor(private entityService: EntityService) { }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities() {
    this.entityService.getEntities().subscribe((data: Entity[]) => {
      console.log(data);
      this.entities = data;
    });
  
  }
}
