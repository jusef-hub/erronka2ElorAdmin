import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Bilera } from '../../services/bilera';
import { Users } from '../../services/users';
import { Reunion, User, Estado } from '../../interface/interfaces';
import { TranslateModule } from '@ngx-translate/core';
import {  RouterLink } from '@angular/router';

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
  private cd = inject(ChangeDetectorRef); 

  currentUser?: User;       
  bilerak: Reunion[] = [];  
  listaUsuarios: User[] = []; 
  
  eEstado = Estado; 
  esProfesor: boolean = false; 


  constructor() {
    // Saioa egiaztatu (sessionStorage)
    let datuak = sessionStorage.getItem('usuarioLogueado');
    if(datuak){
      this.currentUser = JSON.parse(datuak);
      if(this.currentUser){
        // Rola egiaztatu (3 bada irakaslea da)
        this.esProfesor = this.currentUser.tipo_id === 3;
        // Datuak kargatzen hasi
        this.datuakKargatu();
      }
    }
  }

  // -- Datuak kargatu --
  // Funtzio honek erabiltzaileak eta bilerak zerbitzaritik ekartzen ditu
  datuakKargatu(){
    // 1. Erabiltzaile guztiak lortu (izenak jakiteko)
    this.userService.getUser().subscribe({
      next: (allUsers) => {
        this.listaUsuarios = allUsers;

        // 2. Bilera guztiak lortu
        this.bileraService.getBilera().subscribe({
          next: (allBilerak) => {
            let nireBilerak: Reunion[] = [];
            
            if(this.currentUser){
              const erabiltzaile = this.currentUser;
              
              // 3. Iragazi (Rola-ren arabera)
              if (this.esProfesor) {
                // Irakaslea: Nirekin dauden bilerak
                nireBilerak = allBilerak.filter(b => b.profesor_id === erabiltzaile.id);
              } else {
                // Ikaslea: Nik eskatutako bilerak
                nireBilerak = allBilerak.filter(b => b.alumno_id === erabiltzaile.id);
              }
            }

            // 4. Egoerak normalizatu (minuskulaz jarri)
            this.bilerak = nireBilerak.map(r => {
              const estadoNormalizado = (r.estado as string).toLowerCase();
              return { ...r, estado: estadoNormalizado as Estado };
            });

            this.cd.detectChanges(); 
          },
          error: (e) => console.error('Errorea bilerak kargatzean', e)
        });
      },
      error: (e) => console.error('Errorea erabiltzaileak kargatzean', e)
    });
  }

  // -- Solaskidea lortu --
  // Bileran norekin nagoen jakiteko (Irakaslea bada -> Ikaslea bilatu, eta alderantziz)
  solaskideaLortu(reunion: Reunion): string {
    let bilatuBeharrekoId: number | undefined;

    if (this.esProfesor) {
      bilatuBeharrekoId = reunion.alumno_id;
    } else {
      bilatuBeharrekoId = reunion.profesor_id;
    }

    const erabiltzailea = this.listaUsuarios.find(u => u.id === bilatuBeharrekoId);
    return erabiltzailea ? `${erabiltzailea.nombre} ${erabiltzailea.apellidos}` : 'Ezezaguna';
  }

  // -- Select bidez eguneratu --
  // HTMLko desplegablea aldatzean exekutatzen da
  selectBidezEguneratu(reunion: Reunion, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const egoeraBerria = selectElement.value as Estado; 
    this.egoeraAldatu(reunion, egoeraBerria);
  }

  // -- Egoera aldatu --
  // Datu basean aldaketa gorde
  egoeraAldatu(reunion: Reunion, egoeraBerria: Estado) {
    const aurrekoEgoera = reunion.estado;
    reunion.estado = egoeraBerria; // Bistan aldatu

    this.bileraService.updateBilera(reunion).subscribe({
      next: (reunionActualizada) => {
        console.log('Ondo gorde da:', reunionActualizada);
      },
      error: (error) => {
        console.error('Errorea gordetzean:', error);
        reunion.estado = aurrekoEgoera; // Errorea bada, atzera bueltatu
        this.cd.detectChanges();
        alert('Errorea egoera gordetzean.');
      }
    });
  }
}