import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {EntitiesPersonne} from '../../entities/EntitiesPersonne';
import {ModelePersonne} from '../../modele/ModelePersonne';
import {PersonneMapper} from '../../mapper/MapperPersonne';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {
  private apiUrl = 'http://localhost:8080/personne';  // 🔹 Remplace par l'URL de ton backend

  constructor(private http: HttpClient, private mapper: PersonneMapper) {
  }

  // 🔹 Envoyer un formulaire (ModelePersonne) vers le backend
  createPersonne(personne: ModelePersonne): Observable<EntitiesPersonne> {
    console.log(personne)
    const personneToSend = this.mapper.toDomain(personne); // Convertir en format backend
    return this.http.post<EntitiesPersonne>(this.apiUrl, personneToSend);
  }

  getProfs(): Observable<EntitiesPersonne[]> {
    return this.http.get<ModelePersonne[]>(this.apiUrl + "/prof").pipe(
      map((data) => this.mapper.toDomainList(data))
    );
  }

  getEtudiants(): Observable<EntitiesPersonne[]> {
    return this.http.get<ModelePersonne[]>(this.apiUrl + "/etudiant").pipe(
      map((data) => this.mapper.toDomainList(data))
    )
  }

  ajouterProfs(listeIds: number[]): Observable<string> {
    return this.http.put<string>(this.apiUrl + "/prof/ajouterProf", listeIds,
      {responseType: 'text' as 'json'}
    );
  }

  supprimerProfs(listeIds: number[]): Observable<string> {
    return this.http.put<string>(this.apiUrl + "/prof/supprimerProf", listeIds,
      {responseType: 'text' as 'json'}
    );
  }

}


