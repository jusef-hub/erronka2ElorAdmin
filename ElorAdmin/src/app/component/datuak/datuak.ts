import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { User } from '../../interface/interfaces';
import { Users } from '../../services/users';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-datuak',
  imports: [TranslatePipe],
  templateUrl: './datuak.html',
  styleUrl: './datuak.css',
})
export class Datuak {
  userService=inject(Users);
  user: User| undefined;
  //kargatzeko
    private cd = inject(ChangeDetectorRef);

    //Hartu erabiltzailea
  constructor(private router:Router, private route:ActivatedRoute){
   let datuak = sessionStorage.getItem('usuarioLogueado');
    
    if (datuak) {
      this.user = JSON.parse(datuak);
      console.log(this.user)
      
    }
  }
}
