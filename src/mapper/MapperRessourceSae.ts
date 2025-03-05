import { Injectable, model } from '@angular/core';
import { Mapper } from '../domain/kernel/mapper';
import { EntitiesRessourceSae } from '../entities/EntitiesRessourceSae';
import { ModeleRessourceSae } from '../modele/ModeleRessourceSae';

@Injectable({
  providedIn: 'root',
})
export class RessourceSaeMapper implements Mapper<EntitiesRessourceSae, ModeleRessourceSae> {
  
  toEntities(modele: ModeleRessourceSae): EntitiesRessourceSae {
    return {
      idSAE: modele.idSAE,
      iDRessource: modele.iDRessource,
      misEnAvant: modele.misEnAvant
    };
  }

  toModele(entities: EntitiesRessourceSae): ModeleRessourceSae {
    return {
      idSAE: entities.idSAE,
      iDRessource: entities.iDRessource,
      misEnAvant: entities.misEnAvant
    };
  }

  toEntitiesList(modele: ModeleRessourceSae[]): EntitiesRessourceSae[] {
    return modele.map((item) => this.toEntities(item));
  }

  toModeleList(entities: EntitiesRessourceSae[]): ModeleRessourceSae[] {
    return entities.map((item) => this.toModele(item));
  }
}
