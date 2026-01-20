import { Component, inject, OnInit, signal } from '@angular/core';
import{Users} from '../../services/users';
import{User} from '../../interface/interfaces';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import{FormsModule} from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslatePipe, TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule, TranslatePipe],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected readonly title=signal('fronted');
  private translate=inject(TranslateService);
 
  usersS:Users=inject(Users)
  UserList:User[]=[];
  aurkituta=false;
  loginError = false;



userForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)]),
});

   constructor(private router: Router){
    this.translate.get('login.titulo').subscribe({
        next: (res) => console.log('Traducción cargada:', res),
        error: (err) => console.error('Error traducción:', err)
    });
    this.usersS.getUser().subscribe({
      next:value => {
        this.UserList=value;
        console.log(this.UserList)
      },
      error:err=>console.log(err)
    })
  }

  login(){
    for (let i=0;i<this.UserList.length;i++){
      if(this.userForm.value.email==this.UserList[i].email && this.userForm.value.password==this.UserList[i].password){
        this.aurkituta=true;
        console.log("Login exitoso");
        const id= this.UserList[i].id;
        const tipoid= this.UserList[i].tipo_id;
        switch(tipoid){
          case 1:
          this.router.navigate(['/god', id]);
            break;
          case 2:
            this.router.navigate(['/admin', id]);
            break;
          case 3:
            this.router.navigate(['/irakasle', id]);
            break;
          case 4:
             this.router.navigate(['/ikasle', id]);
            break;
          default:
            console.log("Ez da aurkitu");
            return;
          
          }
       

        
        break;
      }
    }
    this.loginError = true;
    
  }
}
