import { Component } from '@angular/core';
import { Entity } from '../models/entity';
import { EntityService } from '../services/entity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entity-edit',
  templateUrl: './entity-edit.component.html',
  styleUrls: ['./entity-edit.component.css']
})
export class EntityEditComponent {
  entity: Entity;
  selectedFile: File | undefined;

  constructor(private entityService: EntityService, private router: Router){
    this.entity = new Entity();
  }

  ngOnInit(): void {
    this.entityService.getEntityProfile().subscribe(entity => {
      this.entity = entity;
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    
    if (this.selectedFile) {
      this.entityService.updateEntity(this.entity, this.selectedFile).subscribe(() => {
        alert('Entidade alterado com sucesso!');
        this.router.navigate(['/profileEntity']);
      }, error => {
        alert('Erro ao editar entidade: ' + error.message);
      });
    } else {
      this.entityService.updateEntity2(this.entity).subscribe(() => {
        alert('Entidade alterado com sucesso!');
        this.router.navigate(['/profileEntity']);
      }, error => {
        alert('Erro ao editar entidade: ' + error.message);
      });
    }
 }
}
