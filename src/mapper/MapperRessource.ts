import { Injectable, model } from '@angular/core';
import { Mapper } from '../domain/kernel/mapper';
import { EntitiesRessource } from '../entities/EntitiesRessource';
import { ModeleRessource } from '../modele/ModeleRessource';

@Injectable({
  providedIn: 'root',
})
export class RessourceMapper implements Mapper<EntitiesRessource, ModeleRessource> {
  
  toEntities(modele: ModeleRessource): EntitiesRessource {
    return {
      idRessource: modele.idRessource,
      contenu: modele.contenu,
      couleur: modele.couleur,
      nom: modele.nom
    };
  }

  toModele(entities: EntitiesRessource): ModeleRessource {
    return {
      idRessource: entities.idRessource,
      contenu: entities.contenu,
      couleur: entities.couleur,
      nom: entities.nom
    };
  }

  toEntitiesList(modele: ModeleRessource[]): EntitiesRessource[] {
    return modele.map((item) => this.toEntities(item));
  }

  toModeleList(entities: EntitiesRessource[]): ModeleRessource[] {
    return entities.map((item) => this.toModele(item));
  }
}
