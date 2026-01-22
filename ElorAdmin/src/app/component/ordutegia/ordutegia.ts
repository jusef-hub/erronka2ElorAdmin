import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // AsyncPipe ya no es necesario para el usuario
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core'; 
import { Horario, User } from '../../interface/interfaces';
import { Egutegia } from '../../services/egutegia';
import { Users } from '../../services/users';
import { Matrikulazioak } from '../../services/matrikulazioak';
import { Moduloa } from '../../services/moduloa';

@Component({
  selector: 'app-ordutegia',
  standalone: true,
  imports: [CommonModule, TranslateModule], // Quitamos AsyncPipe de aquí
  templateUrl: './ordutegia.html',
  styleUrl: './ordutegia.css',
})
export class Ordutegia  { 
  
  // Inyecciones
  private egutegiaService = inject(Egutegia);
  private userService = inject(Users); 
  private matriculacionService = inject(Matrikulazioak);
  private modulosService = inject(Moduloa);
  private cd = inject(ChangeDetectorRef);
  private router = inject(Router);


  esProfesor: boolean = false;
  dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
  egutegia: Horario[] = []; 
  

  currentUser: User | undefined; 

  franjasHorarias = [
    { id: 1, texto: '08:00 - 09:00' },
    { id: 2, texto: '09:00 - 10:00' },
    { id: 3, texto: '10:00 - 11:00' },
    { id: 4, texto: '11:30 - 12:30' },
    { id: 5, texto: '12:30 - 13:30' },
    { id: 6, texto: '13:30 - 14:30' }
  ];

  constructor() {
     const datos = sessionStorage.getItem('usuarioLogueado');

    if (datos) {
      this.currentUser = JSON.parse(datos);


      if (this.currentUser) {
        this.esProfesor = this.currentUser.tipo_id === 3;
        
        this.cargarHorario();
      }
    } else {
      console.warn("No hay usuario en sesión");
    }
  }

  cargarHorario() {
    const usuario = this.currentUser!;

    this.egutegiaService.getEgutegia().subscribe({
      next: (egutegiList: Horario[]) => {
        
    
        if (this.esProfesor) {
          this.egutegia = egutegiList.filter(e => e.profe_id === usuario.id);
          this.cd.detectChanges();
        
        } else {
          this.matriculacionService.getMatrikulazioak().subscribe((matriculas) => {
            
            const miMatricula = matriculas.find(m => m.alum_id === usuario.id);

            if (miMatricula) {
              this.modulosService.getModuluak().subscribe((modulos) => {
                
               
                const misModulosIds = modulos
                  .filter(m => m.ciclo_id === miMatricula.ciclo_id && m.curso === miMatricula.curso)
                  .map(m => m.id); 

                
                this.egutegia = egutegiList.filter(e => misModulosIds.includes(e.modulo_id));
                
                this.cd.detectChanges();
              }); 
            }
          }); 
        }
      },
      error: (err) => console.error('Error al cargar horario:', err)
    }); 
  }

  getClase(dia: string, horaId: number): Horario | undefined {
    return this.egutegia.find(h => h.dia === dia && h.hora === horaId);
  }
}