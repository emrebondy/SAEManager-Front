import { Injectable } from '@angular/core';
import { ModelePersonne } from '../modele/ModelePersonne';
import { EntitiesPersonne } from '../entities/EntitiesPersonne';
import { Mapper } from '../domain/kernel/mapper';

@Injectable({
  providedIn: 'root',
})
export class PersonneMapper implements Mapper<EntitiesPersonne, ModelePersonne> {
  
  // 🔹 Convertit un ModelePersonne (modèle API) en EntitiesPersonne (entité interne)
  toDomain(external: ModelePersonne): EntitiesPersonne {
    return {
      idPersonne: external?.id,  // L'ID n'existe pas dans ModelePersonne, donc on met une valeur par défaut
      nom: external.nom,
      prenom: external.prenom,
      email: external.email,
      password: external.password,
      photoDeProfil: external.photoDeProfil // Valeur par défaut car elle n'existe pas dans le modèle
    };
  }

  // 🔹 Convertit un EntitiesPersonne (entité interne) en ModelePersonne (modèle API)
  toExternal(domain: EntitiesPersonne): ModelePersonne {
    return {
      id: domain.idPersonne,
      nom: domain.nom,
      prenom: domain.prenom,
      photoDeProfil: domain.photoDeProfil,
      password: domain.password,
      email: domain.email,
    };
  }

  // 🔹 Convertit une liste de ModelePersonne en liste d'EntitiesPersonne
  toDomainList(external: ModelePersonne[]): EntitiesPersonne[] {
    return external.map((item) => this.toDomain(item));
  }

  // 🔹 Convertit une liste d'EntitiesPersonne en liste de ModelePersonne
  toExternalList(domain: EntitiesPersonne[]): ModelePersonne[] {
    return domain.map((item) => this.toExternal(item));
  }
}
