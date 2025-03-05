import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CreerSAEService} from '../services/creerSAE.service';
import {ModeleSAE} from '../../modele/ModeleSAE';
import {NgFor, NgIf} from '@angular/common';
import {ModelePersonne} from '../../modele/ModelePersonne';
import {PersonneService} from '../services/personne.service';
import {FormsModule, NgModel} from '@angular/forms';
import {GroupeService} from '../services/groupe.service';
import {ModeleGroupe} from '../../modele/ModeleGroupe';
import {EntitiesGroupe} from '../../entities/EntitiesGroupe';
import {RenduService} from '../services/rendu.service';
import {ModeleRendu} from '../../modele/ModeleRendu';
import bootstrap from 'bootstrap';
import {ModeleEvaluation} from "../../modele/ModeleEvaluation";
import {ModalRenduComponent} from "../modal-rendu/modal-rendu.component";

@Component({
  selector: 'app-detail-sae',
  imports: [NgFor, NgIf, FormsModule, ModalRenduComponent],
  templateUrl: './detail-sae.component.html',
  standalone: true,
  styleUrl: './detail-sae.component.css'
})
export class DetailSaeComponent implements OnInit {

  saeId: number = 0;
  sae: ModeleSAE = {
    idSae: 0,
    nomSae: '',
    anneeUniversitaire: '',
    semestreUniversitaire: 0,
    sujet: '',
    dateModificationSujet: '',
    idResponsable: 0
  };

  etudiantsDispoGroupe: ModelePersonne[] = [];
  etudiantsSelectionnees: ModelePersonne[] = [];

  nomGroupe: string = '';
  estModifiableParEleve: boolean = false;
  groupeCreeMessage: string = '';

  rendus: ModeleRendu[] = [];

  showModal: boolean = false;


  constructor(private route: ActivatedRoute, private saeService: CreerSAEService,
              private personneService: PersonneService,
              private groupeService: GroupeService,
              private renduService: RenduService,) {
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.saeId = idParam ? Number(idParam) : 0;

    if (this.saeId > 0) {
      this.saeService.getSae(this.saeId).subscribe(
        (data) => {
          this.sae = data;
          console.log(this.sae)
        },
        (error) => {
          console.error('Erreur lors de la récupération de la SAE', error);
        }
      );
    }

    this.chargerEtudiantDispoGroupe();
    this.chargerRendus()

  }

  chargerEtudiantDispoGroupe() {
    this.personneService.getEtudiantDispoPourGroupe(this.saeId).subscribe({
      next: (data) => {
        this.etudiantsDispoGroupe = data;
      },
      error: (err) => {
        console.error('Erreur')
      }
    });
  }


  isChecked(id: number): boolean {
    return this.etudiantsSelectionnees.some(etudiant => etudiant.idPersonne === id);
  }

  onCheckboxChange(event: Event, etudiant: ModelePersonne): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.etudiantsSelectionnees.push(etudiant);
    } else {
      const index = this.etudiantsSelectionnees.findIndex(e => e.idPersonne === etudiant.idPersonne);
      if (index > -1) {
        this.etudiantsSelectionnees.splice(index, 1);
      }
    }
  }

  onCheckboxModifialbeChange(event: any): void {
    this.estModifiableParEleve = event.target.checked;
  }

  createGroup(): void {
    if (this.etudiantsSelectionnees.length === 0) {
      alert('Veuillez sélectionner au moins un étudiant pour créer un groupe.');
      return;
    }

    if (!this.nomGroupe) {
      alert('Veuillez entrer un nom pour le groupe.');
      return;
    }



    const modeleGroupe: ModeleGroupe = {
      nom: this.nomGroupe,
      idSae: this.saeId,
      estModifiableParEleve: this.estModifiableParEleve ? 1 : 0,
      idsEtudiants: this.etudiantsSelectionnees.map(etudiant => etudiant.idPersonne)
    };

    this.groupeService.createGroupe(modeleGroupe).subscribe({
      next: (response) => {
        this.groupeCreeMessage = 'Le groupe a été créé avec succès !';
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      error: (error) => {
        console.error('Erreur lors de la création du groupe', error);
        this.groupeCreeMessage = 'Erreur lors de la création du groupe.';
      }
    });
  }

  chargerRendus() {
    this.renduService.getRenduSae(this.saeId).subscribe({
      next: (data) => {
        this.rendus = data;
      },
      error: (err) => {
        console.error('Erreur')
      }
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal(event: boolean) {
    this.showModal = event;
  }
}
