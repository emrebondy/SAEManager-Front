import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CreerSAEService} from '../services/creerSAE.service';
import {ModeleSAE} from '../../modele/ModeleSAE';
import {NgFor, NgIf} from '@angular/common';
import {ModeleRessource} from '../../modele/ModeleRessource';
import {RessourceService} from '../services/ressource.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RessourceSaeService} from '../services/ressourceSae.service';
import {ModeleRessourceSae} from '../../modele/ModeleRessourceSae';
import {PersonneService} from '../services/personne.service';
import {GroupeService} from '../services/groupe.service';
import {RenduService} from '../services/rendu.service';
import {ModalRenduComponent} from '../modal-rendu/modal-rendu.component';
import {ModelePersonne} from '../../modele/ModelePersonne';
import {ModeleRendu} from '../../modele/ModeleRendu';
import {ModeleGroupe} from '../../modele/ModeleGroupe';

@Component({
  selector: 'app-detail-sae',
  imports: [NgIf, NgFor, ReactiveFormsModule, FormsModule, ModalRenduComponent],
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

  ressourceForm: FormGroup;

  ressources: ModeleRessource[] = [];
  ressourcesLiees: ModeleRessourceSae[] = [];
  ressourcesLieesById: ModeleRessourceSae [] = [];

  ressourcesCreat: ModeleRessource = {
    idRessource: 0,
    contenu: "",
    couleur: "",
    nom: ""

  }

  showAddModal: boolean = false;
  showCreateModal: boolean = false;
  selectedFile: File | null = null;

  ressourcesDisponibles: ModeleRessource[] = [];
  selectedRessources: ModeleRessource[] = [];
  showModal: boolean = false;

  nomRessource: string = '';

  etudiantsDispoGroupe: ModelePersonne[] = [];
  etudiantsSelectionnees: ModelePersonne[] = [];

  nomGroupe: string = '';
  estModifiableParEleve: boolean = false;
  groupeCreeMessage: string = '';

  rendus: ModeleRendu[] = [];

  showModalRendu: boolean = false;


  constructor(private route: ActivatedRoute,
              private saeService: CreerSAEService,
              private ressourceService: RessourceService,
              private ressourceSaeService: RessourceSaeService,
              private personneService: PersonneService,
              private groupeService: GroupeService,
              private renduService: RenduService,
              private fb: FormBuilder) {
    this.ressourceForm = this.fb.group({
      nom: [''],
      contenu: [''],
      couleur: ['']
    });


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

    this.ressourceService.getRessources().subscribe(
      (data) => {
        this.ressources = data;
        console.log("voici les ressource " + this.ressources)
      },
      (error) => {
        console.error('Erreur lors de la récupération des ressources', error);
      }
    );

    this.ressourceSaeService.getRessourcesSaeById(this.saeId).subscribe(
      (data) => {
        this.ressourcesLieesById = data;
        console.log("ressource by id " + JSON.stringify(this.ressourcesLieesById, null, 2))
      },
      (error) => {
        console.error('Erreur lors de la récupération des ressources liées', error);
      }
    );

    this.ressourceSaeService.getRessourcesSae().subscribe(
      (data) => {
        this.ressourcesLiees = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des ressources liées', error);
      }
    );

    this.chargerEtudiantDispoGroupe();
    this.chargerRendus()

  }

  loadRessourcesLiees(): void {
    this.ressourceSaeService.getRessourcesSaeById(this.saeId).subscribe(
      (data) => {
        this.ressourcesLieesById = data;
        console.log("data : " + JSON.stringify(data, null, 2))
        console.log("ressource by id " + JSON.stringify(this.ressourcesLieesById, null, 2))
      },
      (error) => {
        console.error('Erreur lors de la récupération des ressources liées', error);
      }
    );
  }

  openModal(): void {
    this.ressourceService.getRessources().subscribe(
      (data) => {
        this.ressources = data;
        this.showModal = true;
      },
      (error) => {
        console.error('Erreur lors de la récupération des ressources disponibles', error);
      }
    );
  }

  closeModal(): void {
    this.showModal = false;
  }

  toggleSelection(ressource: ModeleRessource): void {
    const index = this.selectedRessources.findIndex(r => r.idRessource === ressource.idRessource);
    if (index > -1) {
      this.selectedRessources.splice(index, 1);
    } else {
      this.selectedRessources.push(ressource);
    }
  }

  validerAjout(): void {
    this.selectedRessources.forEach(ressource => {
      const ressourcesSae = {
        "idSAE": this.saeId,
        "iDRessource": ressource.idRessource,
        "misEnAvant": 0
      }
      this.ressourceSaeService.createRessource(ressourcesSae).subscribe(() => {
        this.ressourcesLiees.push(ressourcesSae);
        setTimeout(() => {
          this.loadRessourcesLiees();
        }, 100);
      });
    });
    this.selectedRessources = [];
    this.loadRessourcesLiees
    this.closeModal();
  }

  deleteRessource(idRessource: number): void {
    this.ressourceSaeService.deleteRessourceSae(this.saeId, idRessource).subscribe(() => {
      setTimeout(() => {
        this.loadRessourcesLiees();
      }, 100);
    });

    this.loadRessourcesLiees()
  }


  openCreateModal(): void {
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }


  onNomChanged(event: any): void {
    this.nomRessource = event.target.value;
  }

  createRessource(): void {
    if (this.selectedFile) {

      this.ressourcesCreat.nom = this.nomRessource

      console.log("le nom dans create ressource " + this.ressourcesCreat.nom)
      this.ressourcesCreat.contenu = this.selectedFile.name

      this.ressourceService.createRessource(this.ressourcesCreat).subscribe(
        () => {
          this.loadRessourcesLiees();
          this.closeCreateModal();
        },
        (error) => {
          console.error('Erreur lors de la création de la ressource', error);
        }
      );
    }
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

  openModalRendu() {
    this.showModalRendu = true;
  }

  closeModalRendu(event: boolean) {
    this.showModalRendu = event;
  }
}
