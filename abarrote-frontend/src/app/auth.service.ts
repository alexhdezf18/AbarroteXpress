import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const API = 'http://localhost:3000/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${API}/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('tienda', JSON.stringify(res.tienda));
      }),
    );
  }

  registro(datos: any): Observable<any> {
    return this.http.post(`${API}/registro`, datos);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tienda');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getTienda(): any {
    const raw = localStorage.getItem('tienda');
    return raw ? JSON.parse(raw) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRol(): string {
    return this.getTienda()?.rol ?? '';
  }
}
