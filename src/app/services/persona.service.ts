import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { catchError,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private urlBase = environment.urlBase; 

  constructor(private http: HttpClient) {}

  getPersonas(): Observable<any[]> {
    // Obtener el token
    const token = localStorage.getItem('token');

    // Lo agrego al encabezado
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realizo la petición
    return this.http.get<any[]>(`${this.urlBase}/api/personas/GetAll`, { headers });
  }

  getPersonaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/${id}`);
  }

  createPersona(persona: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(persona);
    return this.http.post<any>(`${this.urlBase}/api/personas/Add`, persona, { headers });
  }

  updatePersona(persona: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.urlBase}/api/personas/Update`, persona, { headers }).pipe(
        map((response) => {
            return { success: true, message: response };
        }),
        catchError((error) => {
            return of({ success: false, message: 'Error al actualizar la persona. Inténtalo nuevamente.' });
        })
    );
  }

  deletePersona(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.urlBase}/api/personas/Delete/${id}`, { headers }).pipe(
        map((response) => {
            return { success: true, message: response };
        }),
        catchError((error) => {
            return of({ success: false, message: 'Error al eliminar la persona. Inténtalo nuevamente.' });
        })
    );
  }
}
