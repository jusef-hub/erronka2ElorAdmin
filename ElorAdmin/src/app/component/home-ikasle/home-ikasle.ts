import { Component, inject } from '@angular/core';
import {RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../../interface/interfaces';
import { Users } from '../../services/users';
import {TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-home-ikasle',
  imports: [RouterLink, RouterOutlet, TranslatePipe],
  templateUrl: './home-ikasle.html',
  styleUrl: './home-ikasle.css',
})
export class HomeIkasle {
  userService=inject(Users)
  user:User |undefined
//Hartu erabiltzailea
  constructor(){
    let datuak = sessionStorage.getItem('usuarioLogueado');
    
    if (datuak) {
      this.user = JSON.parse(datuak);
      console.log(this.user)
    }
  }
}
