import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntitiesPersonne } from '../../entities/EntitiesPersonne';
import { ModelePersonne } from '../../modele/ModelePersonne';
import { PersonneMapper } from '../../mapper/MapperPersonne';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {
  private apiUrl = 'http://localhost:8080/personne';  // 🔹 Remplace par l'URL de ton backend

  constructor(private http: HttpClient, private mapper: PersonneMapper) {}

  // 🔹 Envoyer un formulaire (ModelePersonne) vers le backend
  createPersonne(personne: ModelePersonne): Observable<EntitiesPersonne> {
    console.log(personne)
    const personneToSend = this.mapper.toDomain(personne); // Convertir en format backend
    return this.http.post<EntitiesPersonne>(this.apiUrl, personneToSend);
  }
}
