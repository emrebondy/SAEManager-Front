import { Injectable } from '@angular/core';
import { ModelePersonne } from '../modele/ModelePersonne';
import { EntitiesPersonne } from '../entities/EntitiesPersonne';
import { Mapper } from '../domain/kernel/mapper';

@Injectable({
  providedIn: 'root',
})
export class PersonneMapper implements Mapper<EntitiesPersonne, ModelePersonne> {

  toDomain(external: ModelePersonne): EntitiesPersonne {
    return {
      idPersonne: external.idPersonne,
      nom: external.nom,
      prenom: external.prenom,
      email: external.email,
      password: external.password,
    };
  }

  toExternal(domain: EntitiesPersonne): ModelePersonne {
    return {
      idPersonne: domain.idPersonne,
      nom: domain.nom,
      prenom: domain.prenom,
      password: domain.password,
      email: domain.email,
    };
  }

  toDomainList(external: ModelePersonne[]): EntitiesPersonne[] {
    return external.map((item) => this.toDomain(item));
  }

  toExternalList(domain: EntitiesPersonne[]): ModelePersonne[] {
    return domain.map((item) => this.toExternal(item));
  }
}
