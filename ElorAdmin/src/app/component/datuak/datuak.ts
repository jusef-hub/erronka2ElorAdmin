import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { User } from '../../interface/interfaces';
import { Users } from '../../services/users';
import { Observable } from 'rxjs';
import { RouterOutlet, Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-datuak',
  imports: [AsyncPipe, TranslatePipe],
  templateUrl: './datuak.html',
  styleUrl: './datuak.css',
})
export class Datuak {
  userService=inject(Users);
  private translate=inject(TranslateService)
  user: User| undefined;
    private cd = inject(ChangeDetectorRef);

  constructor(private router:Router, private route:ActivatedRoute){
   let datuak = sessionStorage.getItem('usuarioLogueado');
    
    if (datuak) {
      this.user = JSON.parse(datuak);
      console.log(this.user)
      
    }
  }
}
