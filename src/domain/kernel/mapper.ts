export interface Mapper<T, U> {
    toDomain(external: U): T;
    toExternal(domain: T): U;
    toDomainList(external: U[]): T[];
    toExternalList(domain: T[]): U[];
  }
  