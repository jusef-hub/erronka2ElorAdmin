import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User as UserI} from '../interface/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Users {
   private apiUrl='http://localhost:3000';
    http: HttpClient=inject(HttpClient);
  
    getUser(): Observable<UserI[]> {
      return this.http.get<UserI[]>(this.apiUrl+'/users');
    }

    getUserById(id: number): Observable<UserI>{
      return this.http.get<UserI>(`${this.apiUrl}/users/${id}`);
    }
    
    addUser(item: UserI): Observable<UserI> {
      return this.http.post<UserI>(this.apiUrl+'/users', item);
    }

    updateUser(item: UserI): Observable<UserI> {
     return this.http.put<UserI>(`${this.apiUrl+'/users'}/${item.id}`, item);
    }
  
  
    deleteUser(id: number): Observable<UserI>{
      return this.http.delete<UserI>(`${this.apiUrl+'/users'}/${id}`);
    }
}
