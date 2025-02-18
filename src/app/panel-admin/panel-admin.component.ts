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
  profsFiltres: ModelePersonne[] = [];
  profSelectionnes: number[] = [];
  searchInputProf: string = '';

  etudiants: ModelePersonne[] = [];
  etudiantsFiltres: ModelePersonne[] = [];
  etudiantsSelectionnes: number[] = [];
  searchInputEtudiant: string = '';

  messageProf: string = '';
  messageEtudiant: string = '';


  constructor(private personneService: PersonneService) {
  }

  ngOnInit(): void {
    this.chargerProfs();
    this.chargerEtudiants()
  }

  chargerProfs(): void {
    this.personneService.getProfesseurs().subscribe(
      (response: ModelePersonne[]) => {
        this.profs = response;
        this.profsFiltres = [...this.profs];
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
    const searchLower = this.searchInputEtudiant.toLowerCase();
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
      this.messageEtudiant = "Vous devez sélectionner au moins un étudiant.";
      return;
    }

    this.personneService.ajouterProfs(this.etudiantsSelectionnes).subscribe({
      next: (response) => {
        this.messageEtudiant = response;
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      },
      error: (err) => {
        console.log(err);
        this.messageEtudiant = "Une erreur s'est produite lors de l'ajout des professeurs.";
      }
    });
  }


  annulerAction() {
    if (this.etudiantsSelectionnes.length === 0) {
      this.messageEtudiant = "Vous devez sélectionner au moins un étudiant.";
      return;
    }

    this.etudiantsSelectionnes = [];
    this.messageEtudiant = 'Sélection vidée avec succès';

    const checkboxes = document.querySelectorAll<HTMLInputElement>('.check-etudiant');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }


  filtrerProfs() {
    const searchLower = this.searchInputProf.toLowerCase();
    this.profsFiltres = this.profs.filter(prof =>
        `${prof.prenom} ${prof.nom}`.toLowerCase().includes(searchLower)
    );
  }

  selectionnerProf(id: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.profSelectionnes.push(id);
    } else {
      this.profSelectionnes = this.profSelectionnes.filter(profId => profId !== id);
    }
  }

  validerSelectionProf() {

    if (this.profSelectionnes.length === 0) {
      this.messageProf = "Vous devez sélectionner au moins un prof.";
      return;
    }

    this.messageProf = ''; // Réinitialise le message d'erreur

    this.personneService.supprimerProfs(this.profSelectionnes).subscribe({
      next: (response) => {
        this.messageProf = response;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (err) => {
        console.log(err);
        this.messageProf = "Une erreur s'est produite lors de la suppression des professeurs.";
      }
    });
  }


  annulerActionProf() {
    if (this.profSelectionnes.length === 0) {
      this.messageProf = "Vous devez sélectionner au moins un prof.";
      return;
    }

    this.profSelectionnes = [];
    this.messageProf = 'Sélection vidée avec succès';

    const checkboxes = document.querySelectorAll<HTMLInputElement>('.check-prof');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

}

