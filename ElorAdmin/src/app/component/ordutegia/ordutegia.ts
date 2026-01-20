import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common'; 
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core'; 
import { Horario, User } from '../../interface/interfaces';
import { Egutegia } from '../../services/egutegia';
import { Users } from '../../services/users';

@Component({
  selector: 'app-ordutegia',
  standalone: true,
  imports: [AsyncPipe, CommonModule, TranslateModule], 
  templateUrl: './ordutegia.html',
  styleUrl: './ordutegia.css',
})
export class Ordutegia {
  egutegiaService = inject(Egutegia);
  userService = inject(Users);
  
  dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];

  egutegia: Horario[] = []; 
  user$!: Observable<User>;

  franjasHorarias = [
    { id: 1, texto: '08:00 - 09:00' },
    { id: 2, texto: '09:00 - 10:00' },
    { id: 3, texto: '10:00 - 11:00' },
    { id: 4, texto: '11:30 - 12:30' },
    { id: 5, texto: '12:30 - 13:30' },
    { id: 6, texto: '13:30 - 14:30' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.user$ = this.userService.getUserById(id);
      
      this.user$.subscribe(user => {
        this.egutegiaService.getEgutegia().subscribe({
          next: (egutegiList: Horario[]) => {
            this.egutegia = egutegiList.filter(e => e.profe_id === user.id);
          }
        });
      });
    });
  }

  getClase(dia: string, horaId: number): Horario | undefined {
    return this.egutegia.find(h => h.dia === dia && h.hora === horaId);
  }
}