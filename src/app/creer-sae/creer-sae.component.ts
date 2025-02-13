import { Component, OnInit } from '@angular/core';
import { ModelePersonne } from '../../modele/ModelePersonne';
import { PersonneService } from '../services/personne.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-creer-sae',
  imports: [NgIf, NgFor],
  templateUrl: './creer-sae.component.html',
  styleUrl: './creer-sae.component.css'
})
export class CreerSAEComponent implements OnInit {

  etudiants: ModelePersonne[] = [];
  professeurs: ModelePersonne[] = [];

  constructor(private personneService: PersonneService) {}

  ngOnInit(): void {
    this.personneService.getEtudiants().subscribe({
      next: (data) => {
        this.etudiants = data;
        console.log('Étudiants chargés:', this.etudiants);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des étudiants', err);
      }
    });

    this.personneService.getProfesseurs().subscribe({
      next: (data) => {
        this.professeurs = data;
        console.log('Professeurs chargés:', this.professeurs);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des professeurs', err);
      }
    });
  }

}
