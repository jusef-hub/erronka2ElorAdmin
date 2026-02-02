import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Ikastetxeak } from '../../services/ikastetxeak';
import { Ikastetxea as IkasIn } from '../../interface/interfaces';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ikastetxea',
  imports: [AsyncPipe, TranslatePipe, RouterLink],
  templateUrl: './ikastetxea.html',
  styleUrl: './ikastetxea.css',
})
export class Ikastetxea {
  public ikas$: Observable<IkasIn> | undefined; 
  private ikasService = inject(Ikastetxeak);
//Hartu ikastetxearen idA eta bilatu 
  constructor(){
    const idA = sessionStorage.getItem('ikastetxeaHartu');
    if (idA) {
      const id = JSON.parse(idA);
      this.ikas$ = this.ikasService.getIkastetxeaById(id);
    }
  }
}
