import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { RessourceSaeMapper } from '../../mapper/MapperRessourceSae';
import { EntitiesRessourceSae } from '../../entities/EntitiesRessourceSae';
import { ModeleRessourceSae } from '../../modele/ModeleRessourceSae';


@Injectable({
  providedIn: 'root'
})
export class RessourceSaeService {
  private apiUrl = 'http://localhost:8080/ressourceSae';

  constructor(private http: HttpClient, private mapper: RessourceSaeMapper) {
  }


  getRessourcesSae(): Observable<EntitiesRessourceSae[]> {
    return this.http.get<ModeleRessourceSae[]>(this.apiUrl).pipe(
      map((ressourcesSae) => this.mapper.toModeleList(ressourcesSae))
    )
  }
  
  getRessourcesSaeById(idSae: number): Observable<EntitiesRessourceSae[]> {
    return this.http.get<ModeleRessourceSae[]>(`${this.apiUrl}/${idSae}`).pipe(
      map((ressourcesSae) => this.mapper.toModeleList(ressourcesSae))
    )
  }

  createRessource(ressource: ModeleRessourceSae): Observable<EntitiesRessourceSae> {
    const ressourceToSend = this.mapper.toEntities(ressource); 
    return this.http.post<EntitiesRessourceSae>(this.apiUrl, ressourceToSend);
  }

  deleteRessourceSae(idSae: number, idRessource: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idSae}/${idRessource}`);
  }

}