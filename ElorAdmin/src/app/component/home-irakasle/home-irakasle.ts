import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { User } from '../../interface/interfaces';
import { Users } from '../../services/users';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RouterOutlet, RouterLink} from '@angular/router';
@Component({
  selector: 'app-home-irakasle',
  imports: [RouterLink, RouterOutlet, TranslatePipe],
  templateUrl: './home-irakasle.html',
  styleUrl: './home-irakasle.css',
})
export class HomeIrakasle {
  userService=inject(Users)
  cd=inject(ChangeDetectorRef)
  private translate=inject(TranslateService)
  user$!:Observable<User>
  user:User | undefined

//Hartu erabiltzailea
  constructor(){
    let datuak = sessionStorage.getItem('usuarioLogueado');
    
    if (datuak) {
      this.user = JSON.parse(datuak);
      console.log(this.user)
    }
  }
}
