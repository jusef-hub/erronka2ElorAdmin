import { Component, inject } from '@angular/core';
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
  user$!: Observable<User>;
  originalUser!: User;

  constructor(private router:Router, private route:ActivatedRoute){
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.user$ = this.userService.getUserById(id);
      this.user$.subscribe(user => {
        this.originalUser=user;
        console.log(user);
      });
    });
  }
}
