import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { NgxPaginationModule } from 'ngx-pagination'; 
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Users } from '../../services/users';
import {User } from '../../interface/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-ikasleak',
  standalone: true, 
  imports: [CommonModule, FormsModule, NgxPaginationModule, TranslateModule],
  templateUrl: './ikasleak.html',
  styleUrl: './ikasleak.css',
})
export class Ikasleak {
  
  private userService = inject(Users);
  private ikasleakSubject = new BehaviorSubject<User[]>([]);

  ikasleak$: Observable<User[]> = this.ikasleakSubject.asObservable(); 
  
  currentPage: number = 1;
  criterioOrden: string = 'izena'; 

  //Hartu erabiltzailea
  constructor(private router: Router, private route: ActivatedRoute) {
    let datuak=sessionStorage.getItem('usuarioLogueado');
      if (datuak) {
        let user$ =JSON.parse(datuak)
        //Hartu erabiltzaile guztiak
        this.userService.getUser().subscribe((users: User[]) => {
            //Bilatu ikasleak direnak
            const alumnosFiltrados = users.filter(u => u.tipo_id == 4);
            
            this.ikasleakSubject.next(alumnosFiltrados);
        });
      }
    
  }
//Select option ordenatu
  antolatuLista() {
    //Jatorrizko lista
    const listaActual = [...this.ikasleakSubject.value];

    //zerrenda berrantolatzeko Sort
    listaActual.sort((a, b) => {
      //Benetako propietateak hartu
      const valA = (a as any)[this.mapCriterio(this.criterioOrden)] || '';
      const valB = (b as any)[this.mapCriterio(this.criterioOrden)] || '';

      if (typeof valA === 'string') {
        //localeCompare azentoal kudeaketa
          return valA.localeCompare(valB);
      }
      //ordenatu txikienetik handienera
      return valA - valB;
    });

    this.ikasleakSubject.next(listaActual);
  }
//Datu-baserako
  mapCriterio(criterio: string): string {
      switch(criterio) {
          case 'izena': return 'nombre';
          case 'apellidos': return 'apellidos';
          case 'email': return 'email';
          default: return 'nombre';
      }
  }
}