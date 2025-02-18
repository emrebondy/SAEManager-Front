import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ModeleSae } from '../../modele/ModeleSAE';

@Component({
  selector: 'app-sae',
  imports: [NgFor,NgIf],
  templateUrl: './sae.component.html',
  styleUrl: './sae.component.css'
})
export class SaeComponent {


  saes: ModeleSae[] = [];

  

  constructor() {}

  ngOnInit(): void {
    // Simule des données récupérées d'une API
    this.saes = [
      {
        idSAE: 1,
        nomSae: 'SAE 1',
        anneeUniversitaire: '2024-2025',
        semestreUniversitaire: 1,
        sujet: 'Projet de développement',
        dateModificationSujet: '2025-01-15',
        responsablesSae: [
          { idResp: 101, sae: { idSAE: 1 } }
        ]
      },
      {
        idSAE: 2,
        nomSae: 'SAE 2',
        anneeUniversitaire: '2024-2025',
        semestreUniversitaire: 2,
        sujet: 'Analyse de données',
        dateModificationSujet: '2025-02-10',
        responsablesSae: [
          { idResp: 102, sae: { idSAE: 2 } }
        ]
      }
    ];
  }

  
}
