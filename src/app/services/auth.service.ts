import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.urlBase}/api/Auth/token`;

  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const body = { Login: username, Password: password };
    return this.http.post<any>(this.apiUrl, body);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.authStatus.next(true); // Actualiza el estado de autenticación a verdadero
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authStatus.next(false); // Actualiza el estado de autenticación a falso
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}
