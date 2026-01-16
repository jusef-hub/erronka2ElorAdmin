import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Ciclo} from '../interface/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Zikloa {
   private apiUrl='http://localhost:3000';
    http: HttpClient=inject(HttpClient);

    getZikloa():Observable<Ciclo[]> {
      return this.http.get<Ciclo[]>(this.apiUrl+'/ciclos');
    }

    getZikloaById(id: number): Observable<Ciclo> {
      return this.http.get<Ciclo>(`${this.apiUrl}/ciclos/${id}`);
    }

    addZikloa(item: Ciclo): Observable<Ciclo> {
      return this.http.post<Ciclo>(this.apiUrl, item);
    }

    updateZikloa(item: Ciclo) {
     return this.http.put<Ciclo>(`${this.apiUrl}/${item.id}`, item);
    }


    deleteZikloa(id: number): Observable<Ciclo>{
      return this.http.delete<Ciclo>(`${this.apiUrl}/${id}`);
    }
}