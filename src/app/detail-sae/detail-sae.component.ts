import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreerSAEService } from '../services/creerSAE.service';
import { ModeleSAE } from '../../modele/ModeleSAE';
import { NgFor, NgIf } from '@angular/common';
import { ModeleRessource } from '../../modele/ModeleRessource';
import { RessourceService } from '../services/ressource.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RessourceSaeService } from '../services/ressourceSae.service';
import { ModeleRessourceSae } from '../../modele/ModeleRessourceSae';

@Component({
  selector: 'app-detail-sae',
  imports: [NgIf,NgFor,ReactiveFormsModule],
  templateUrl: './detail-sae.component.html',
  styleUrl: './detail-sae.component.css'
})
export class DetailSaeComponent implements OnInit{

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

  
  constructor(private route: ActivatedRoute, private saeService: CreerSAEService, private ressourceService: RessourceService, private ressourceSaeService: RessourceSaeService , private fb: FormBuilder) {
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


  openCreateModal(): void { this.showCreateModal = true; }
  closeCreateModal(): void { this.showCreateModal = false; }

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
    if ( this.selectedFile) {
      
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
}
