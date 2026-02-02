import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // AsyncPipe ya no es necesario para el usuario
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core'; 
import { Horario, User } from '../../interface/interfaces';
import { Egutegia } from '../../services/egutegia';
import { Matrikulazioak } from '../../services/matrikulazioak';
import { Moduloa } from '../../services/moduloa';

@Component({
  selector: 'app-ordutegia',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './ordutegia.html',
  styleUrl: './ordutegia.css',
})
export class Ordutegia  { 
  
  private egutegiaService = inject(Egutegia);
  private matriculacionService = inject(Matrikulazioak);
  private modulosService = inject(Moduloa);
  private cd = inject(ChangeDetectorRef);

  esProfesor: boolean = false;
  egunak = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
  egutegia: Horario[] = []; 
  

  currentUser: User | undefined; 

  orduak = [
    { id: 1, texto: '08:00 - 09:00' },
    { id: 2, texto: '09:00 - 10:00' },
    { id: 3, texto: '10:00 - 11:00' },
    { id: 4, texto: '11:30 - 12:30' },
    { id: 5, texto: '12:30 - 13:30' },
    { id: 6, texto: '13:30 - 14:30' }
  ];
//Hartu erabiltzailea sessionStorage-arekin
  constructor() {
     const datos = sessionStorage.getItem('usuarioLogueado');

    if (datos) {
      this.currentUser = JSON.parse(datos);


      if (this.currentUser) {
        //irakaslea ID hori dauka
        this.esProfesor = this.currentUser.tipo_id === 3;
        
        this.kargatuEgutegia();
      }
    } else {
      console.warn("Ez dago erabiltzailerik sesioan");
    }
  }

  kargatuEgutegia() {
    const usuario = this.currentUser!;

    this.egutegiaService.getEgutegia().subscribe({
      next: (egutegiList: Horario[]) => {
        
    
        if (this.esProfesor) {
          this.egutegia = egutegiList.filter(e => e.profe_id === usuario.id);
          this.cd.detectChanges();
        
        } else {
          this.matriculacionService.getMatrikulazioak().subscribe((matrikulak) => {
            
            const matrikulazioa= matrikulak.find(m => m.alum_id === usuario.id);

            if (matrikulazioa) {
              this.modulosService.getModuluak().subscribe((modulos) => {
                
               //Filtratu ziklo eta kurtsoan dauden moduloak (ID-a hartu)
                const misModulosIds = modulos
                  .filter(m => m.ciclo_id === matrikulazioa.ciclo_id && m.curso === matrikulazioa.curso)
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
//Bilatu klasea eguna eta orduaren arabera
  getKlasea(eguna: string, ordua: number): Horario | undefined {
    return this.egutegia.find(h => h.dia === eguna && h.hora === ordua);
  }
}