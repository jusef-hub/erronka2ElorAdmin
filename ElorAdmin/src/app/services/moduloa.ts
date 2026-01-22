import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modulo } from '../interface/interfaces';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class Moduloa {
   private apiUrl='http://localhost:3004';
    http: HttpClient=inject(HttpClient);
  
    getModuluak(): Observable<Modulo[]> {
      return this.http.get<Modulo[]>(this.apiUrl+'/modulos');
    }

    getModuluaById(id: number): Observable<Modulo> {
      return this.http.get<Modulo>(`${this.apiUrl}/modulos/${id}`);
    }

    addModulua(item: Modulo): Observable<Modulo> {
      return this.http.post<Modulo>(this.apiUrl+'/modulos', item);
    }

    updateModulua(item: Modulo): Observable<Modulo> {
     return this.http.put<Modulo>(`${this.apiUrl+'/modulos'}/${item.id}`, item);
    }
  
  
    deleteModulua(id: number): Observable<Modulo> {
      return this.http.delete<Modulo>(`${this.apiUrl+'/modulos'}/${id}`);
    }
}
