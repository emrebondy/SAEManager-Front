import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {ModeleRendu} from '../../modele/ModeleRendu';
import {RenduService} from '../services/rendu.service';
import {FormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-modal-rendu',
  templateUrl: './modal-rendu.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  styleUrls: ['./modal-rendu.component.css']
})
export class ModalRenduComponent implements OnChanges{
  @Input() showModalRendu: boolean = false;
  @Input() idSAE: number = 0;
  @Output() modalClose = new EventEmitter<boolean>();

  newRendu: ModeleRendu = {
    idRendu: null,
    nom: '',
    dateLimite: '',
    sae: {idSAE: 0},
    evaluation: null
  };

  renduNote: boolean = false;
  coef: number | null = null;

  message: string = '';

  constructor(private renduService: RenduService) {
  }

  ngOnChanges() {
    if (this.idSAE) {
      this.newRendu.sae.idSAE = this.idSAE;
    }
  }

  closeModal(event: Event): void {
    event.stopPropagation();
    this.modalClose.emit(false);
  }

  submitRendu(): void {
    if (this.renduNote) {
      this.newRendu.evaluation = {
        idEval: null,
        coef: this.coef,
        intervenantEvaluateur: null
      };
    } else {

      this.newRendu.evaluation = null;
    }

    this.renduService.createRendu(this.newRendu).subscribe({
      next: (response) => {
        this.message = 'Rendu crée'
        setTimeout(() => {
          this.modalClose.emit(false);
          location.reload();
        }, 3000);
      },
      error: (error) => {
        this.message = 'Erreur'
      }
    });
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}


