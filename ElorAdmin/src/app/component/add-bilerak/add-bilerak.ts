import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { User, Ikastetxea } from '../../interface/interfaces';
import { Users } from '../../services/users';
import { Ikastetxeak } from '../../services/ikastetxeak';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-add-bilerak',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './add-bilerak.html',
  styleUrl: './add-bilerak.css',
})
export class AddBilerak {
  userService=inject(Users)
  ikastetxeService=inject(Ikastetxeak)
  private sanitizer = inject(DomSanitizer);
  
  user: User | undefined
  irakasleak$!:Observable<User[]> 
  ikastetxeak$!:Observable<Ikastetxea[]>

  mapaUrl: SafeResourceUrl | undefined;

  constructor(){
    let datuak=sessionStorage.getItem('usuarioLogueado');
    if(datuak){
      this.user=JSON.parse(datuak)
    }
    this.ikastetxeak$=this.ikastetxeService.getIkastetxeak()
    this.ikastetxeak$.subscribe({
       next: (allIkastetxe) => {
        console.log('Ikastetxeak: '+allIkastetxe)
       }
    })
    this.irakasleak$=this.userService.getUser()
     this.irakasleak$.subscribe({
       next: (erabiltzaileak) => {
        const irakasleak=erabiltzaileak.filter(i=>i.tipo_id==3)
        console.log('Irakasleak: '+irakasleak)
       }
    })
}

cargarMapa(lat: number, lon: number) {
    if (lat && lon) {
      const url = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
      
      this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}