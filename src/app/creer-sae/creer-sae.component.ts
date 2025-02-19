import { Component, OnInit } from '@angular/core';
import { ModelePersonne } from '../../modele/ModelePersonne';
import { PersonneService } from '../services/personne.service';
import { NgFor, NgIf } from '@angular/common';
import { ModeleSAE } from '../../modele/ModeleSAE';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreerSAEService } from '../services/creerSAE.service';

@Component({
  selector: 'app-creer-sae',
  imports: [NgIf, NgFor,ReactiveFormsModule],
  templateUrl: './creer-sae.component.html',
  styleUrl: './creer-sae.component.css'
})
export class CreerSAEComponent implements OnInit {

  etudiants: ModelePersonne[] = [];
  professeurs: ModelePersonne[] = [];

  constructor(private personneService: PersonneService, private creerSaeService: CreerSAEService) {}

  saeForm = new FormGroup({
    nomSae : new FormControl(''),
    semestre : new FormControl(''),
    sujet : new FormControl(''),      
    })


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

  handleSubmit(): void {
        const sae: ModeleSAE = {
          idSae: 0,
          nomSae: this.saeForm.value.nomSae || '',
          anneeUniversitaire: "2025",
          semestreUniversitaire: Number(this.saeForm.value.semestre) || 0,
          sujet: this.saeForm.value.sujet || '',
          dateModificationSujet: new Date().toISOString().split('T')[0],
          idResponsable: 43
        };

        console.log("voici le sujet" + this.saeForm.value.sujet)

      console.log(sae)
      //Appel du service pour créer la SAE
      this.creerSaeService.createSae(sae).subscribe(
        response => {
          console.log('SAE créée avec succès', response);
        },
        error => {
          console.error('Erreur lors de la création de la SAE', error);
        }
      );
    

  }

}
