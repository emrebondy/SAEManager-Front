export interface Mapper<T, U> {
    toEntities(modele: U): T;
    toModele(entities: T): U;
    toEntitiesList(modele: U[]): T[];
    toModeleList(entities: T[]): U[];
  }
  