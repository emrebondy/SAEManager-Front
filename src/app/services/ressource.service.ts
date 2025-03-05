import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { RessourceMapper } from '../../mapper/MapperRessource';
import { EntitiesRessource } from '../../entities/EntitiesRessource';
import { ModeleRessource } from '../../modele/ModeleRessource';


@Injectable({
  providedIn: 'root'
})
export class RessourceService {
  private apiUrl = 'http://localhost:8080/ressource';

  constructor(private http: HttpClient, private mapper: RessourceMapper) {
  }

  getRessources(): Observable<EntitiesRessource[]> {
    return this.http.get<ModeleRessource[]>(this.apiUrl).pipe(
      map((ressources) => this.mapper.toModeleList(ressources))
    )
  }

  createRessource(ressource: ModeleRessource): Observable<EntitiesRessource> {
    const ressourceToSend = this.mapper.toEntities(ressource); 
    return this.http.post<EntitiesRessource>(this.apiUrl, ressourceToSend);
  }

  deleteRessource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}