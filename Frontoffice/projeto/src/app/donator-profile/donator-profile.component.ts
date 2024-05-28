import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DonatorService } from '../services/donator.service';
import { Donator } from '../models/donator';

@Component({
  selector: 'app-entity',
  standalone: true,
  imports: [],
  templateUrl: './donator-profile.component.html',
  styleUrl: './donator-profile.component.css'
})

export class DonatorProfileComponent implements OnInit {
  donator?:Donator;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private donatorsService: DonatorService
  ) { }

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.donatorsService.getDonator(idTemp).subscribe((data : Donator)=>{
      this.donator = data;
    })
  }

}
