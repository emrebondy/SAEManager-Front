import {Component, OnInit} from '@angular/core';
import {PersonneService} from '../services/personne.service';
import {CommonModule} from '@angular/common';
import {ModelePersonne} from '../../modele/ModelePersonne';
import {FormsModule, NgModel} from "@angular/forms";

@Component({
  selector: 'app-panel-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-admin.component.html',
  standalone: true,
  styleUrl: './panel-admin.component.css'
})
export class PanelAdminComponent implements OnInit {

  profs: ModelePersonne[] = [];
  etudiants: ModelePersonne[] = [];
  etudiantsFiltres: ModelePersonne[] = [];
  etudiantsSelectionnes: number[] = [];
  message: string = '';
  searchInput: string = '';

  constructor(private personneService: PersonneService) {
  }

  ngOnInit(): void {
    this.chargerProfs();
    this.chargerEtudiants()
  }

  chargerProfs(): void {
    this.personneService.getProfs().subscribe(
      (response: ModelePersonne[]) => {
        this.profs = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  chargerEtudiants(): void {
    this.personneService.getEtudiants().subscribe(
      (response: ModelePersonne[]) => {
        this.etudiants = response;
        this.etudiantsFiltres = [...this.etudiants];
      }
    )
  }

  filtrerEtudiants() {
    const searchLower = this.searchInput.toLowerCase();
    this.etudiantsFiltres = this.etudiants.filter(etudiant =>
        `${etudiant.prenom} ${etudiant.nom}`.toLowerCase().includes(searchLower)
    );
  }

  selectionnerEtudiant(id: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.etudiantsSelectionnes.push(id);
    } else {
      this.etudiantsSelectionnes = this.etudiantsSelectionnes.filter(etudiantId => etudiantId !== id);
    }
  }

  validerSelection() {

    if (this.etudiantsSelectionnes.length === 0) {
      this.message = "Vous devez sélectionner au moins un étudiant.";
      return;
    }

    this.message = ''; // Réinitialise le message d'erreur

    this.personneService.ajouterProfs(this.etudiantsSelectionnes).subscribe({
      next: (response) => {
        this.message = response;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (err) => {
        console.log(err);
        this.message = "Une erreur s'est produite lors de l'ajout des professeurs.";
      }
    });
  }


  annulerAction() {
    this.etudiantsSelectionnes = [];
    this.message = 'Sélection vidée avec succès';

    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

}

