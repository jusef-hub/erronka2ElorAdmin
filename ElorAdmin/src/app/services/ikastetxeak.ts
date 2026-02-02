import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ikastetxea } from '../interface/interfaces';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class Ikastetxeak {
     private apiUrl='http://localhost:3004/centros';
        private http = inject(HttpClient);
      
     getIkastetxeak(): Observable<Ikastetxea[]> {
       return this.http.get<Ikastetxea[]>(this.apiUrl);
     }
 
     getIkastetxeaById(id: number): Observable<Ikastetxea> {
       return this.http.get<Ikastetxea>(`${this.apiUrl}/${id}`);
     }
 
     addIkastetxea(item: Ikastetxea): Observable<Ikastetxea[]> {
       return this.http.post<Ikastetxea[]>(this.apiUrl, item);
     }
 
     updateIkastetxea(item: Ikastetxea): Observable<Ikastetxea[]> {
        return this.http.put<Ikastetxea[]>(`${this.apiUrl}/${item.CCEN}`, item);
     }
      
     deleteIkastetxea(id: number): Observable<Ikastetxea[]> {
       return this.http.delete<Ikastetxea[]>(`${this.apiUrl}/${id}`);
     }
}