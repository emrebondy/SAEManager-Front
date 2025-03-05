import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MapperGroupe} from "../../mapper/MapperGroupe";
import {ModeleGroupe} from "../../modele/ModeleGroupe";

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  private apiUrl = 'http://localhost:8080/groupe';

  constructor(private http: HttpClient, private mapper: MapperGroupe) {}

  createGroupe(groupe:ModeleGroupe) {
    return this.http.post(this.apiUrl, this.mapper.toEntities(groupe));
  }
}
