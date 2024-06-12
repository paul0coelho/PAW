import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonatorService } from '../services/donator.service';
import { Donator } from '../models/donator';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-donator-profile',
  templateUrl: './donator-profile.component.html',
  styleUrls: ['./donator-profile.component.css']
})
export class DonatorProfileComponent implements OnInit {
  donator?: Donator;
  error?: string;

  constructor(
    private router: Router, 
    private sanitizer: DomSanitizer,
    private donatorService: DonatorService
  ) {}

  ngOnInit(): void {
    this.loadDonatorProfile();
  }

  private loadDonatorProfile(): void {
    this.donatorService.getDonatorProfile().subscribe({
      next: (data: Donator) => {
        this.donator = data;
        console.log('Informação do perfil:', data);
        if (data._id) {
          this.loadProfileImage(data._id);
        } else {
          console.error('O id do doador é indefinido');
        }
      },
      error: (error: any) => {
        this.error = 'Falha ao carregar perfil do doador';
        console.error('Falha ao carregar perfil do doador:', error);
        this.router.navigate(['/login']);
      }
    });
  }

  private loadProfileImage(id: string): void {
    if (!id) {
      console.error('Não foi possível carregar a imagem, o id é indefinido');
      return;
    }

    this.donatorService.getDonatorImage(id).subscribe({
      next: (imageBlob: Blob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        if (this.donator) {
          this.donator.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar imagem de perfil:', error);
      }
    });
  }
}
  