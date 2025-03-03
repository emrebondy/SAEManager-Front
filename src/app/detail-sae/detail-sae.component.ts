import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreerSAEService } from '../services/creerSAE.service';
import { ModeleSAE } from '../../modele/ModeleSAE';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-detail-sae',
  imports: [],
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
  
  constructor(private route: ActivatedRoute, private saeService: CreerSAEService) {}

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
  }


}
