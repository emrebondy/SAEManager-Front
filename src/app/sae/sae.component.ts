import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ModeleSAE } from '../../modele/ModeleSAE';
import { CreerSAEService } from '../services/creerSAE.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sae',
  imports: [NgFor,NgIf,RouterModule],
  templateUrl: './sae.component.html',
  styleUrl: './sae.component.css'
})
export class SaeComponent {


  saes: ModeleSAE[] = [];

  

  constructor(private saeService: CreerSAEService) {}

  ngOnInit(): void {

    this.saeService.getAllSae().subscribe({
      next: (data) => {
        this.saes = data;
        console.log('saes chargés:', this.saes);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des saes', err);
      }
    });
    

  }

  
}
