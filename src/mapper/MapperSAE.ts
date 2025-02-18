import { Injectable } from '@angular/core';
import { Mapper } from '../domain/kernel/mapper';
import { EntitiesSAE } from '../entities/EntitiesSAE';
import { ModeleSAE } from '../modele/ModeleSAE';

@Injectable({
  providedIn: 'root',
})
export class SAEMapper implements Mapper<EntitiesSAE, ModeleSAE> {
  
  // Convertit un ModelePersonne en EntitiesPersonne
  toEntities(modele: ModeleSAE): EntitiesSAE {
    return {
      idSAE: modele.idSAE,
      nomSae: modele.nomSae,
      anneeUniversitaire: modele.anneeUniversitaire,
      semestreUniversitaire: modele.semestreUniversitaire,
      sujet: modele.sujet,
      dateModificationSujet: modele.dateModificationSujet,
      idResponsable: modele.idResponsable
    };
  }

  // Convertit un EntitiesPersonne en ModelePersonne
  toModele(entities: EntitiesSAE): ModeleSAE {
    return {
      idSAE: entities.idSAE,
      nomSae: entities.nomSae,
      anneeUniversitaire: entities.anneeUniversitaire,
      semestreUniversitaire: entities.semestreUniversitaire,
      sujet: entities.sujet,
      dateModificationSujet: entities.dateModificationSujet,
      idResponsable: entities.idResponsable
    };
  }

  // Convertit une liste de ModelePersonne en liste d'EntitiesPersonne
  toEntitiesList(modele: ModeleSAE[]): EntitiesSAE[] {
    return modele.map((item) => this.toEntities(item));
  }

  // Convertit une liste d'EntitiesPersonne en liste de ModelePersonne
  toModeleList(entities: EntitiesSAE[]): ModeleSAE[] {
    return entities.map((item) => this.toModele(item));
  }
}
