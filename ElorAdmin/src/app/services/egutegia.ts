import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Horario } from '../interface/interfaces';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class Egutegia {
   private apiUrl='http://localhost:3000';
    http: HttpClient=inject(HttpClient);
  
    getEgutegia(): Observable<Horario[]> {
      return this.http.get<Horario[]>(this.apiUrl+'/horarios');
    }

    getEgutegiaById(id: number): Observable<Horario> {
      return this.http.get<Horario>(`${this.apiUrl}/horarios/${id}`);
    }

    addEgutegia(item: Horario): Observable<Horario> {
      return this.http.post<Horario>(this.apiUrl + "/horarios/", item);
    }

    updateEgutegia(item: Horario): Observable<Horario> {
     return this.http.put<Horario>(`${this.apiUrl + "/horarios/"}/${item.id}`, item);
    }
  
  
    deleteEgutegia(id: number): Observable<Horario> {
      return this.http.delete<Horario>(`${this.apiUrl + "/horarios/"}/${id}`);
    }
}
