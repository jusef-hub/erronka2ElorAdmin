import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matriculacion } from '../interface/interfaces';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class Matrikulazioak {
   private apiUrl='http://localhost:3004';
    http: HttpClient=inject(HttpClient);
  
    getMatrikulazioak(): Observable<Matriculacion[]> {
      return this.http.get<Matriculacion[]>(this.apiUrl+'/matriculaciones');
    }

    getMatrikulazioaById(id: number): Observable<Matriculacion> {
      return this.http.get<Matriculacion>(`${this.apiUrl}/matriculaciones/${id}`);
    }

    addMatrikulazioa(item: Matriculacion): Observable<Matriculacion> {
      return this.http.post<Matriculacion>(this.apiUrl+'/matriculaciones', item);
    }

    updateMatrikulazioa(item: Matriculacion): Observable<Matriculacion> {
     return this.http.put<Matriculacion>(`${this.apiUrl+'/matriculaciones'}/${item.id}`, item);
    }
  
  
    deleteMatrikulazioa(id: number): Observable<Matriculacion> {
      return this.http.delete<Matriculacion>(`${this.apiUrl+'/matriculaciones'}/${id}`);
    }
}
