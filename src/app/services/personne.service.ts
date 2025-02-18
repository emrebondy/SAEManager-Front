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
  private apiUrl = 'http://localhost:8080/personne';

  constructor(private http: HttpClient, private mapper: PersonneMapper) {
  }

  createPersonne(personne: ModelePersonne): Observable<EntitiesPersonne> {
    console.log(personne)
    const personneToSend = this.mapper.toEntities(personne);
    return this.http.post<EntitiesPersonne>(this.apiUrl, personneToSend);
  }


  getEtudiants(): Observable<EntitiesPersonne[]> {
    return this.http.get<ModelePersonne[]>(this.apiUrl + "/etudiant").pipe(
      map((etudiants) => this.mapper.toModeleList(etudiants))
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


  getProfesseurs(): Observable<ModelePersonne[]> {
    return this.http.get<EntitiesPersonne[]>(`${this.apiUrl}/prof`).pipe(
      map((professeurs) => professeurs.map((prof) => this.mapper.toModele(prof)))
    );
  }
}


