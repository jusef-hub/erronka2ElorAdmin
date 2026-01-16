import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modulo } from '../interface/interfaces';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class Moduloa {
   private apiUrl='http://localhost:3000';
    http: HttpClient=inject(HttpClient);
  
    getBilera(): Observable<Modulo[]> {
      return this.http.get<Modulo[]>(this.apiUrl+'/modulos');
    }

    getBileraById(id: number): Observable<Modulo> {
      return this.http.get<Modulo>(`${this.apiUrl}/modulos/${id}`);
    }

    addBilera(item: Modulo): Observable<Modulo> {
      return this.http.post<Modulo>(this.apiUrl, item);
    }

    updateBilera(item: Modulo): Observable<Modulo> {
     return this.http.put<Modulo>(`${this.apiUrl}/${item.id}`, item);
    }
  
  
    deleteBilera(id: number): Observable<Modulo> {
      return this.http.delete<Modulo>(`${this.apiUrl}/${id}`);
    }
}
