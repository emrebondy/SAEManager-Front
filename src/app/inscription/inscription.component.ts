import { Component } from '@angular/core';
import { PersonneService } from '../services/personne.service';
import { ModelePersonne } from '../../modele/ModelePersonne';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PersonneMapper } from '../../mapper/MapperPersonne';

@Component({
  selector: 'app-inscription',
  imports: [ReactiveFormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

  accountCreationForm = new FormGroup({
    lastname : new FormControl(''),
    firstname : new FormControl(''),
    password : new FormControl(''),
    email : new FormControl(''),    
  })

  constructor(private personneService: PersonneService){}

  handleSubmit(){
    if (this.accountCreationForm.valid) {
      const personne: ModelePersonne = {
        id: 145, 
        nom: this.accountCreationForm.value.lastname || '',
        prenom: this.accountCreationForm.value.firstname || '',
        photoDeProfil: "null", // Si nécessaire, vous pouvez ajouter un champ pour cela
        password: this.accountCreationForm.value.password || '',
        email: this.accountCreationForm.value.email || ''

      };
  
      this.personneService.createPersonne(personne).subscribe(
        response => {
          console.log('Personne créée avec succès', response);
          // Ajouter ici une redirection ou un message de succès
        },
        error => {
          console.error('Erreur lors de la création de la personne', error);
          // Gérer les erreurs ici, ex: affichage d'un message d'erreur
        }
      );
    } else {
      console.warn('Le formulaire est invalide');
      // Ajouter ici un message pour informer l'utilisateur
    }
  }

}
