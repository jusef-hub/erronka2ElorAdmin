import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Reunion } from '../interface/interfaces';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class Bilera {
  private apiUrl='http://localhost:3000';
  http: HttpClient=inject(HttpClient);

  getBilera():  Observable<Reunion[]> {
    return this.http.get<Reunion[]>(this.apiUrl+'/reuniones');
  }

  getBileraById(id: number): Observable<Reunion> {
    return this.http.get<Reunion>(`${this.apiUrl}/reuniones/${id}`);
  }

  addBilera(item: Reunion): Observable<Reunion> {
    return this.http.post<Reunion>(this.apiUrl, item);
  }

  updateBilera(item: Reunion): Observable<Reunion> {
   return this.http.put<Reunion>(`${this.apiUrl}/${item.id_reunion}`, item);
  }


  deleteBilera(id: number) {
    return this.http.delete<Reunion>(`${this.apiUrl}/${id}`);
  }
}
