import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Tipo} from '../interface/interfaces';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class Mota {
   private apiUrl='http://localhost:3004';
    http: HttpClient=inject(HttpClient);
  
    getMota():  Observable<Tipo[]> {
      return this.http.get<Tipo[]>(this.apiUrl+'/tipos');
    }

    getMotaById(id: number): Observable<Tipo> {
      return this.http.get<Tipo>(`${this.apiUrl}/tipos/${id}`);
    }

    addMota(item: Tipo): Observable<Tipo> {
      return this.http.post<Tipo>(this.apiUrl+'/tipos', item);
    }

    updateMota(item: Tipo): Observable<Tipo> {
     return this.http.put<Tipo>(`${this.apiUrl+'/tipos'}/${item.id}`, item);
    }
  
  
    deleteMota(id: number): Observable<Tipo> {
      return this.http.delete<Tipo>(`${this.apiUrl+'/tipos'}/${id}`);
    }
}
