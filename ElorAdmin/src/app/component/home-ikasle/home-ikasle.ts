import { Component, inject } from '@angular/core';
import {Router, ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../../interface/interfaces';
import { Users } from '../../services/users';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home-ikasle',
  imports: [RouterLink, RouterOutlet, AsyncPipe, TranslatePipe],
  templateUrl: './home-ikasle.html',
  styleUrl: './home-ikasle.css',
})
export class HomeIkasle {
  userService=inject(Users)
  private translate=inject(TranslateService)
  user$!:Observable<User>

  constructor(private router:Router, private route:ActivatedRoute){
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.user$ = this.userService.getUserById(id);
      this.user$.subscribe(user => {
        console.log(user);
      });
    });
  }
}
