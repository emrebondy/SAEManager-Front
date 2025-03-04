import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode'; // Import modifié

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
  private roleSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    const token = this.getToken();
    if (token) {
      this.setRoleFromToken(token);
    }
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
