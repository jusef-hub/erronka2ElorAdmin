import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Horario } from '../interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class Egutegia {
   private apiUrl='http://localhost:3000';
    http: HttpClient=inject(HttpClient);
  
    getEgutegia(){
      return this.http.get<Horario[]>(this.apiUrl+'/horarios');
    }

    getEgutegiaById(id: number){
      return this.http.get<Horario>(`${this.apiUrl}/horarios/${id}`);
    }
    
    addEgutegia(item: Horario) {
      return this.http.post<Horario>(this.apiUrl, item);
    }
  
    updateEgutegia(item: Horario) {
     return this.http.put<Horario>(`${this.apiUrl}/${item.id}`, item);
    }
  
  
    deleteEgutegia(id: number) {
      return this.http.delete<Horario>(`${this.apiUrl}/${id}`);
    }
}
