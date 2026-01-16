import { Component, inject, signal } from '@angular/core';
import{User, Reunion, Tipo} from '../../interface/interfaces';
import{Users} from '../../services/users';
import{HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Bilera} from '../../services/bilera';
import {Mota} from '../../services/mota';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-home-god',
  imports: [CommonModule, FormsModule],
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
  filteredList: User[] = [];

  users$: Observable<User[]>;
  bilerak$: Observable<Reunion[]>;
  motak$: Observable<Tipo[]>;

  UserList: User[] = [];


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
}