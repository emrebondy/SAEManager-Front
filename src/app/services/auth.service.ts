import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode'; // Import modifié
import {HttpClient} from '@angular/common/http';

export interface JwtToken {
  sub: string;
  exp: number;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private baseUrl = 'http://localhost:8080/api/auth'; // Adapte l'URL à ton backend
  private roleSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      // Recharge le token pour mettre à jour le roleSubject
      this.saveToken(token);
    }
  }

  inscrirePersonne(registrationData: any): Observable<any> {
    // Adaptez l'URL en fonction de votre configuration
    return this.http.post<any>('http://localhost:8080/personne/inscription', registrationData);
  }


  // Méthode pour s'inscrire : envoie un POST vers /api/auth/register
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  // Méthode de connexion
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.setRoleFromToken(token);
  }

  setRoleFromToken(token: string): void {
    try {
      // Utilise le cast as any pour appeler la fonction decode
      const decoded = (jwt_decode as any).default(token);
      console.log('Decoded token:', decoded);
      this.roleSubject.next(decoded.role || null);
    } catch (error) {
      console.error('Error decoding token:', error);
      this.roleSubject.next(null);
    }
  }

  getUserRole(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.roleSubject.next(null);
  }
}
