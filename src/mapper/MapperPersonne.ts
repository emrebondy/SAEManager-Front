import { Injectable } from '@angular/core';
import { ModelePersonne } from '../modele/ModelePersonne';
import { EntitiesPersonne } from '../entities/EntitiesPersonne';
import { Mapper } from '../domain/kernel/mapper';

@Injectable({
  providedIn: 'root',
})
export class PersonneMapper implements Mapper<EntitiesPersonne, ModelePersonne> {
  
  // 🔹 Convertit un ModelePersonne (modèle API) en EntitiesPersonne (entité interne)
  toEntities(modele: ModelePersonne): EntitiesPersonne {
    return {
      id: modele.id ?? 0,
      nom: modele.nom,
      prenom: modele.prenom,
      email: modele.email,
      password: modele.password,
    };
  }

  // 🔹 Convertit un EntitiesPersonne (entité interne) en ModelePersonne (modèle API)
  toModele(entities: EntitiesPersonne): ModelePersonne {
    return {
      id: entities.id,
      nom: entities.nom,
      prenom: entities.prenom,
      password: entities.password,
      email: entities.email,
    };
  }

  // 🔹 Convertit une liste de ModelePersonne en liste d'EntitiesPersonne
  toEntitiesList(modele: ModelePersonne[]): EntitiesPersonne[] {
    return modele.map((item) => this.toEntities(item));
  }

  // 🔹 Convertit une liste d'EntitiesPersonne en liste de ModelePersonne
  toModeleList(entities: EntitiesPersonne[]): ModelePersonne[] {
    return entities.map((item) => this.toModele(item));
  }
}
