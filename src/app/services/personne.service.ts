import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EntitiesPersonne } from '../../entities/EntitiesPersonne';
import { ModelePersonne } from '../../modele/ModelePersonne';
import { PersonneMapper } from '../../mapper/MapperPersonne';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {
  private apiUrl = 'http://localhost:8080/personne';

  constructor(private http: HttpClient, private mapper: PersonneMapper) {}

  createPersonne(personne: ModelePersonne): Observable<EntitiesPersonne> {
    console.log(personne)
    const personneToSend = this.mapper.toEntities(personne);
    return this.http.post<EntitiesPersonne>(this.apiUrl, personneToSend);
  }

  getEtudiants(): Observable<ModelePersonne[]> {
    return this.http.get<EntitiesPersonne[]>(`${this.apiUrl}/etudiant`).pipe(
      map((etudiants) => etudiants.map((etudiant) => this.mapper.toModele(etudiant)))
    );
  }

  getProfesseurs(): Observable<ModelePersonne[]> {
    return this.http.get<EntitiesPersonne[]>(`${this.apiUrl}/prof`).pipe(
      map((professeurs) => professeurs.map((prof) => this.mapper.toModele(prof)))
    );
  }
}
