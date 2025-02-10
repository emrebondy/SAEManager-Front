import {Component, OnInit} from '@angular/core';
import {PersonneService} from '../services/personne.service';
import {CommonModule} from '@angular/common';
import {ModelePersonne} from '../../modele/ModelePersonne';

@Component({
  selector: 'app-panel-admin',
  imports: [CommonModule],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.css'
})
export class PanelAdminComponent implements OnInit {

  profs: ModelePersonne[] = [];
  etudiants: ModelePersonne[] = [];
  etudiantsFiltres: ModelePersonne[] = [];

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
        this.etudiantsFiltres = response;
      }
    )
  }
}

