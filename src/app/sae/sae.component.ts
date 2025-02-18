import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ModeleSAE } from '../../modele/ModeleSAE';

@Component({
  selector: 'app-sae',
  imports: [NgFor,NgIf],
  templateUrl: './sae.component.html',
  styleUrl: './sae.component.css'
})
export class SaeComponent {


  saes: ModeleSAE[] = [];

  

  constructor() {}

  ngOnInit(): void {
    this.saes = [
    
      {
        idSAE: 1,
        nomSae: "Développement d'une application web pour la gestion d'événements",
        anneeUniversitaire: '2024-2025',
        semestreUniversitaire: 1,
        sujet: 'Projet de développement',
        dateModificationSujet: '2025-01-15',
        idResponsable: 43
      },
      {
        idSAE: 2,
        nomSae: "Développement d'une application de gestion d'inventaire en C (console)",
        anneeUniversitaire: '2024-2025',
        semestreUniversitaire: 2,
        sujet: 'Analyse de données',
        dateModificationSujet: '2025-02-10',
        idResponsable: 43
      },
      {
        idSAE: 3,
        nomSae: "Création d'un jeu vidéo 2D en Java avec JavaFX",
        anneeUniversitaire: '2024-2025',
        semestreUniversitaire: 1,
        sujet: 'Projet de développement',
        dateModificationSujet: '2025-01-15',
        idResponsable: 43
      },
      {
        idSAE: 4,
        nomSae: "Développement d’un logiciel de gestion de planning en Python (console)",
        anneeUniversitaire: '2024-2025',
        semestreUniversitaire: 2,
        sujet: 'Analyse de données',
        dateModificationSujet: '2025-02-10',
        idResponsable: 43
      },
      {
        idSAE: 5,
        nomSae: "Simulation d’un système de gestion de banque en C++ (console)",
        anneeUniversitaire: '2024-2025',
        semestreUniversitaire: 2,
        sujet: 'Analyse de données',
        dateModificationSujet: '2025-02-10',
        idResponsable: 43
      },
      {
        idSAE: 6,
        nomSae: "Sae DROIT RGPD",
        anneeUniversitaire: '2024-2025',
        semestreUniversitaire: 1,
        sujet: 'Projet de développement',
        dateModificationSujet: '2025-01-15',
        idResponsable: 43
      },
      {
        idSAE: 7,
        nomSae: "SAE refactoring code dev web des s3",
        anneeUniversitaire: '2024-2025',
        semestreUniversitaire: 2,
        sujet: 'Analyse de données',
        dateModificationSujet: '2025-02-10',
        idResponsable: 43
      }
    ];
  }

  
}
