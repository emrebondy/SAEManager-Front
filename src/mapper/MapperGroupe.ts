import {Injectable} from '@angular/core';
import {Mapper} from '../domain/kernel/mapper';
import {EntitiesGroupe} from '../entities/EntitiesGroupe';
import {ModeleGroupe} from '../modele/ModeleGroupe';

@Injectable({
  providedIn: 'root',
})
export class MapperGroupe implements Mapper<EntitiesGroupe, ModeleGroupe> {

  toEntities(modele: ModeleGroupe): EntitiesGroupe {
    return {
      nom: modele.nom,
      //imageTitre: modele.imageTitre,
      idSae: modele.idSae,
      estModifiableParEleve: modele.estModifiableParEleve,
      idsEtudiants: modele.idsEtudiants,
    };
  }

  toModele(entities: EntitiesGroupe): ModeleGroupe {
    return {
      nom: entities.nom,
      //imageTitre: entities.imageTitre,
      idSae: entities.idSae,
      estModifiableParEleve: entities.estModifiableParEleve,
      idsEtudiants: entities.idsEtudiants,
    }
  }

  toEntitiesList(modele: ModeleGroupe[]): EntitiesGroupe[] {
    return modele.map((item) => this.toEntities(item));
  }

  toModeleList(entities: EntitiesGroupe[]): ModeleGroupe[] {
    return entities.map((item) => this.toModele(item));
  }
}
