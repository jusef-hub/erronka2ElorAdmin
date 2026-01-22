import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { NgxPaginationModule } from 'ngx-pagination'; 
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Users } from '../../services/users';
import { Horario, Matriculacion, Modulo, User } from '../../interface/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { Moduloa } from '../../services/moduloa';
import { Matrikulazioak } from '../../services/matrikulazioak';
import { Egutegia } from '../../services/egutegia';

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

  constructor(private router: Router, private route: ActivatedRoute) {
    let datuak=sessionStorage.getItem('usuarioLogueado');
      if (datuak) {
        let user$ =JSON.parse(datuak)
        this.userService.getUser().subscribe((users: User[]) => {
            
            const alumnosFiltrados = users.filter(u => u.tipo_id == 4);
            
            this.ikasleakSubject.next(alumnosFiltrados);
        });
      }
    
  }

  ordenarLista() {
    const listaActual = [...this.ikasleakSubject.value];

    listaActual.sort((a, b) => {
      const valA = (a as any)[this.mapCriterio(this.criterioOrden)] || '';
      const valB = (b as any)[this.mapCriterio(this.criterioOrden)] || '';

      if (typeof valA === 'string') {
          return valA.localeCompare(valB);
      }
      return valA - valB;
    });

    this.ikasleakSubject.next(listaActual);
  }

  mapCriterio(criterio: string): string {
      switch(criterio) {
          case 'izena': return 'nombre';
          case 'apellidos': return 'apellidos';
          case 'email': return 'email';
          default: return 'nombre';
      }
  }
}