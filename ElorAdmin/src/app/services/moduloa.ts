import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modulo } from '../interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class Moduloa {
   private apiUrl='http://localhost:3000';
    http: HttpClient=inject(HttpClient);
  
    getBilera(){
      return this.http.get<Modulo[]>(this.apiUrl+'/modulos');
    }
    
    getBileraById(id: number){
      return this.http.get<Modulo>(`${this.apiUrl}/modulos/${id}`);
    }

    addBilera(item: Modulo) {
      return this.http.post<Modulo>(this.apiUrl, item);
    }
  
    updateBilera(item: Modulo) {
     return this.http.put<Modulo>(`${this.apiUrl}/${item.id}`, item);
    }
  
  
    deleteBilera(id: number) {
      return this.http.delete<Modulo>(`${this.apiUrl}/${id}`);
    }
}
