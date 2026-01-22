import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Bilera } from '../../services/bilera';
import { Users } from '../../services/users';
import { Reunion, User, Estado } from '../../interface/interfaces';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-bilerak',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './bilerak.html',
  styleUrl: './bilerak.css',
})
export class Bilerak {
  
  private bileraService = inject(Bilera);
  private userService = inject(Users);
  private route = inject(ActivatedRoute);
  private translate = inject(TranslateService);
  private cd = inject(ChangeDetectorRef);

  currentUser?: User; 
  bilerak: Reunion[] = []; 
  listaUsuarios: User[] = []; 
  
  eEstado = Estado; 
  

  esProfesor: boolean = false;

  constructor() {
    let datuak=sessionStorage.getItem('usuarioLogueado');
    if(datuak){
      this.currentUser=JSON.parse(datuak)
      if(this.currentUser){
        this.esProfesor= this.currentUser.tipo_id===3;
        this.datuakKargatu()
      }
    }
        }

  datuakKargatu(){
    this.userService.getUser().subscribe({
            next: (allUsers) => {
              this.listaUsuarios = allUsers;

              this.bileraService.getBilera().subscribe({
                next: (allBilerak) => {
                  let misReuniones: Reunion[] = [];
                  if(this.currentUser){
                    const erabiltzaile=this.currentUser
                  if (this.esProfesor) {
                    misReuniones = allBilerak.filter(b => b.profesor_id === erabiltzaile.id);
                  } else {
                    misReuniones = allBilerak.filter(b => b.alumno_id === erabiltzaile.id);
                  }
                }

                  // Normalizar el estado a minúsculas para evitar errores
                  this.bilerak = misReuniones.map(r => {
                    const estadoNormalizado = (r.estado as string).toLowerCase();
                    return { ...r, estado: estadoNormalizado as Estado };
                  });

                  this.cd.detectChanges();
                },
          error: (e) => console.error('Error cargando reuniones', e)
        });
      },
      error: (e) => console.error('Error cargando usuarios', e)
    });
  }


  getNombreInterlocutor(reunion: Reunion): string {
    let idABuscar: number | undefined;

    if (this.esProfesor) {
      idABuscar = reunion.alumno_id;
    } else {
      idABuscar = reunion.profesor_id;
    }

    const usuario = this.listaUsuarios.find(u => u.id === idABuscar);
    return usuario ? `${usuario.nombre} ${usuario.apellidos}` : 'Desconocido';
  }

  actualizarDesdeSelect(reunion: Reunion, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const nuevoEstado = selectElement.value as Estado; 
    this.cambiarEstado(reunion, nuevoEstado);
  }

  cambiarEstado(reunion: Reunion, nuevoEstado: Estado) {
    const estadoAnterior = reunion.estado;
    reunion.estado = nuevoEstado;

    this.bileraService.updateBilera(reunion).subscribe({
      next: (reunionActualizada) => {
        console.log('Guardado OK:', reunionActualizada);
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        reunion.estado = estadoAnterior;
        this.cd.detectChanges();
        alert('Error al guardar el estado.');
      }
    });
  }

  Logina(){

  }
}