import { Component, OnInit } from '@angular/core';
import { Entity } from '../models/entity';
import { Router } from '@angular/router';
import { EntityService } from '../services/entity.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer, 
    private entityService: EntityService
    
  ) { }

  ngOnInit(): void {
    this.loadEntityProfile();
  }
  private loadEntityProfile(): void {
    this.entityService.getEntityProfile().subscribe({
      next: (data: Entity) => {
        this.entity = data;
        console.log('Informação do perfil:', data);
        if (data._id) {
          this.loadProfileImage(data._id);
        } else {
          console.error('Id da entidade não definido');
        }
      },
      error: (error: any) => {
        this.error = 'Falha ao carregar perfil da entidade';
        console.error('Falha ao carregar perfil da entidade: ', error);
        this.router.navigate(['/login']);
      }
    });
  }

  private loadProfileImage(id: string): void {
    if (!id) {
      console.error('Não foi possível carregar a imagem, id indefinido');
      return;
    }

    this.entityService.getEntityImage(id).subscribe({
      next: (imageBlob: Blob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        if (this.entity) {
          this.entity.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar imagem de perfil:', error);
      }
    });
  }
}
