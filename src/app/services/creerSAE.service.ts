import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ModeleSAE } from '../../modele/ModeleSAE';
import { EntitiesSAE } from '../../entities/EntitiesSAE';
import { SAEMapper } from '../../mapper/MapperSAE';

@Injectable({
  providedIn: 'root'
})
export class CreerSAEService {
  private apiUrl = 'http://localhost:8080/sae';

  constructor(private http: HttpClient, private mapper: SAEMapper) {}

  createSae(sae: ModeleSAE): Observable<EntitiesSAE>{
    console.log(sae)
    const saeToSend = this.mapper.toEntities(sae);
    return this.http.post<EntitiesSAE>(`${this.apiUrl}/create`, saeToSend);
  }

  
}
