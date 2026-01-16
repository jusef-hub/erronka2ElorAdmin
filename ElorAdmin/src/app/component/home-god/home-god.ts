import { Component, inject, signal } from '@angular/core';
import{User, Reunion, Tipo} from '../../interface/interfaces';
import{Users} from '../../services/users';
import{HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Bilera} from '../../services/bilera';
import {Mota} from '../../services/mota';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-home-god',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home-god.html',
  styleUrl: './home-god.css',
})
export class HomeGod {
  bileraS:Bilera=inject(Bilera)
  usersS:Users=inject(Users)
  motaS:Mota=inject(Mota)

  ReunionList:Reunion[]=[];
  MotaList:Tipo[]=[];
  kopuruakArray: number[] = [];
  selected:string = "Guztiak";
  Aukeratu:string[] = [];
  filteredList: User[] = []
   UserList: User[] = [];
  users$: Observable<User[]>;
  bilerak$: Observable<Reunion[]>;
  motak$: Observable<Tipo[]>;

  ezkutatuta=false;
 
newUser= new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('',  [Validators.required]),
    username: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    dni: new FormControl(null, [Validators.required,Validators.pattern('^[0-9]{8}$')]),
    direccion: new FormControl(''),
    telefono: new FormControl(null, [Validators.pattern('^[0-9]{9}$')]),
    telefono2: new FormControl(null, [Validators.pattern('^[0-9]{9}$')]),
    tipo_id: new FormControl(null,  [Validators.pattern('^[1-4]$')]) 
});

constructor(private router: Router){
  this.users$ = this.usersS.getUser();
  this.users$.subscribe({
    next: (users: User[]) => {
      console.log(users)
      this.UserList = users;
      this.kopuruak();
      this.filtratu("Guztiak");
      console.log("ok")
       

    },
    error: err => console.log(err)
  });
  this.bilerak$ = this.bileraS.getBilera();
  this.bilerak$.subscribe({
    next: (bileraList: Reunion[]) => {
      console.log(bileraList);
      this.ReunionList = bileraList;
      this.kopuruak();

      
  
    },
    error: err => console.log(err)
  });

  this.motak$ = this.motaS.getMota();
  this.motak$.subscribe({
    next: (motaList: Tipo[]) => {
      console.log(motaList);
      this.MotaList = motaList;
      this.Aukeratu = [...new Set(this.MotaList.map(j => j.name))];
      console.log("Aukeratu: "+ this.Aukeratu);
    },
    error: err => console.log(err)
  });
}

kopuruak(): void {
    let ikKop=0;
  let irKop=0;
  for (let i=0;i<this.UserList.length;i++){
    if(this.UserList[i].tipo_id==4){
      ikKop++;
    }else if(this.UserList[i].tipo_id==3){
      irKop++;
    }
  }
  let gaurkoBilKop=this.ReunionList.length;
  this.kopuruakArray = [ikKop, irKop, gaurkoBilKop];
}


filtratu(selectedValue: string) {
  console.log("filtratu")
  if (selectedValue === 'Guztiak') {
    this.filteredList = [...this.UserList];
  }else {
    const selectedMota = this.MotaList.find(m => m.name === selectedValue);
    if (selectedMota) {
      const selectedMotaId = selectedMota.id;
      this.filteredList = this.UserList.filter(user => user.tipo_id === selectedMotaId);
    } else {
       this.filteredList = [...this.UserList];
    }
  }
  console.log(this.filteredList)
}
kendu(id: number) {
    this.usersS.deleteUser(id).subscribe({
      next: () => {
        console.log(`Heroe ${id} kenduta`);
        this.users$ = this.usersS.getUser();
      },
      error: (err) => console.error('Errorea kentzean:', err)
    });
  }
  gehitu() {
  if (this.newUser.valid) {
    this.users$.subscribe({
      next: (users) => {
        const hurrengoId =
          users.length > 0
            ? Math.max(...users.map(h => h.id)) + 1
            : 1;

        const AddUser: User = {
          id: hurrengoId,
          email: this.newUser.value.email!,
          username: this.newUser.value.username!,
          password: this.newUser.value.password!,
          nombre: this.newUser.value.nombre!,
          apellidos: this.newUser.value.apellidos!,
          dni: this.newUser.value.dni!,
          direccion: this.newUser.value.direccion!,
          telefono1: this.newUser.value.telefono!,
          telefono2: this.newUser.value.telefono2!,
          tipo_id: this.newUser.value.tipo_id!,
          argazkia_url: 'foto.webp',
          creation_date: new Date(),
          update_date: new Date()
        };

        this.users$.subscribe({
          next: (userSortuta) => {
            console.log('Erabiltzailea gehitua:', userSortuta);
            this.users$ = this.usersS.getUser();
            this.ezkutatuta = true;
          },
          error: (err) => {
            console.error('Errorea heroia sortzerakoan:', err);
          }
        });
      },
      error: (err) => console.error('Errorea gehitzean:', err)
    });
  }
}

erakutsiForm() {
    this.ezkutatuta = !this.ezkutatuta;
  }

}