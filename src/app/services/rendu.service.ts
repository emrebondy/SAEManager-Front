import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ModeleRendu} from '../../modele/ModeleRendu';

@Injectable({
  providedIn: 'root'
})
export class RenduService {
  private apiUrl = 'http://localhost:8080/rendu';

  constructor(private http: HttpClient) {
  }

  getRenduSae(idSAE: number) {
    return this.http.get<ModeleRendu[]>(this.apiUrl, {params: {idSAE: idSAE}});
  }

  createRendu(rendu: ModeleRendu) {
    return this.http.post<ModeleRendu>(this.apiUrl, rendu);
  }

}
