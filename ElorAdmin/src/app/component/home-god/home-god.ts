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
import { TranslatePipe, TranslateDirective, TranslateService } from '@ngx-translate/core';
import { disabled } from '@angular/forms/signals';
import{NgxPaginationModule} from 'ngx-pagination';


@Component({
  selector: 'app-home-god',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslatePipe, NgxPaginationModule],
  templateUrl: './home-god.html',
  styleUrl: './home-god.css',
})
export class HomeGod {
  bileraS:Bilera=inject(Bilera)
  usersS:Users=inject(Users)
  motaS:Mota=inject(Mota)
  private translate=inject(TranslateService);

  reunionList:Reunion[]=[];
  motaList:Tipo[]=[];
  kopuruakArray: number[] = [];
  selected:string = "Guztiak";
  aukeratu:string[] = [];
  filteredList: User[] = []
   UserList: User[] = [];
  users$: Observable<User[]>;
  bilerak$: Observable<Reunion[]>;
  motak$: Observable<Tipo[]>;

  ezkutatuta=false;
  ezkutatutaMod=false;
  currentPage=1;
  idEditatzeko=0;
 
newUser= new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('',  [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.pattern('^[0-9]{8}[A-Za-z]$')]),
    direccion: new FormControl(''),
    telefono: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
    telefono2: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
   tipo_id: new FormControl(null, [Validators.required])
});
modUser= new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl('',  [Validators.email]),
    username: new FormControl('' ),
    apellidos: new FormControl(''),
    password: new FormControl(''),
    dni: new FormControl('', [Validators.pattern('^[0-9]{8}[A-Za-z]$')]),
    direccion: new FormControl(''),
    telefono: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
    telefono2: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
tipo_id: new FormControl<number | null>(null)
});

constructor(private router: Router){
   this.translate.get('admin.titulo').subscribe({
        next: (res) => console.log('Traducción cargada:', res),
        error: (err) => console.error('Error traducción:', err)
    });
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
      this.reunionList = bileraList;
      this.kopuruak();

      
  
    },
    error: err => console.log(err)
  });

  this.motak$ = this.motaS.getMota();
  this.motak$.subscribe({
    next: (motaList: Tipo[]) => {
      console.log(motaList);
      this.motaList = motaList;
      this.aukeratu = [...new Set(this.motaList.map(j => j.name))];
      console.log("aukeratu: "+ this.aukeratu);
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
  let gaurkoBilKop=this.reunionList.length;
  this.kopuruakArray = [ikKop, irKop, gaurkoBilKop];
}


filtratu(selectedValue: string) {
  console.log("filtratu")
  if (selectedValue === 'Guztiak') {
    this.filteredList = [...this.UserList];
  }else {
    const selectedMota = this.motaList.find(m => m.name === selectedValue);
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
        console.log(`Erabiltzaile ${id} kenduta`);
        this.users$ = this.usersS.getUser();
        window.location.reload();
      },
      error: (err) => console.error('Errorea kentzean:', err)
    });
  }
 gehitu() {
  if (this.newUser.valid) {
    const dniValor = this.newUser.value.dni || '';
        if (dniValor !== '') {
        const nanOndo = this.konprobatuNAN(dniValor);
        if (!nanOndo) {
            alert("NAN-a txarto (El formato o la letra no coinciden)");
            return;
        }
    }
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
          dni:dniValor,
          direccion: this.newUser.value.direccion|| '',
          telefono1: Number(this.newUser.value.telefono || 0),
          telefono2: Number(this.newUser.value.telefono2 || 0),
          tipo_id: this.newUser.value.tipo_id!,
          argazkia_url: 'foto.webp',
          created_at: new Date(), 
          updated_at: new Date()
        };
        

        this.usersS.addUser(AddUser).subscribe({
          next: (userSortuta) => {
            console.log('Erabiltzailea gehitua:', userSortuta);
            this.users$ = this.usersS.getUser();
            this.ezkutatuta = false;
            window.location.reload();
            this.newUser.reset();
          },
          error: (err) => {
            console.error('Errorea erabiltzailea sortzerakoan:', err);
          }
        });
      },
      error: (err) => console.error('Errorea gehitzean:', err)
    });
  }
}

konprobatuNAN(nan:string):boolean{
  if (!/^[0-9]{8}[A-Za-z]$/.test(nan)) {
    return false;
  }

  const zbk = parseInt(nan.substring(0, 8));
  const letraUsuario = nan.substring(8).toUpperCase();

  const letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
  const letraCorrecta = letrasValidas[zbk % 23];

  return letraUsuario === letraCorrecta;
}



erakutsiForm() {
    this.ezkutatuta = !this.ezkutatuta;
  }

  atzera(){
    this.ezkutatuta=false;
    this.ezkutatutaMod=false;
  }
  formMod(user:User){
    this.ezkutatutaMod =true ;
    this.idEditatzeko=user.id;
    this.modUser.patchValue({
        nombre: user.nombre,
        email: user.email,
        username: user.username,
        apellidos: user.apellidos,
        dni: user.dni,
        direccion: user.direccion,
        telefono:user.telefono1 ? user.telefono1.toString() : '', 
        telefono2: user.telefono2 ? user.telefono2.toString() : '',
        tipo_id: user.tipo_id,
        password: '' 
    });
  }

  modifikatu(){
    if(this.modUser.valid){
      this.idEditatzeko;
       const dniValor = this.modUser.value.dni || '';
        if (dniValor !== '') {
        const nanOndo = this.konprobatuNAN(dniValor);
        if (!nanOndo) {
            alert("NAN-a txarto (El formato o la letra no coinciden)");
            return;
        }
    }
      const modiUser: User = {
          id:this.idEditatzeko,
          email: this.modUser.value.email!,
          username: this.modUser.value.username!,
          password: this.modUser.value.password!,
          nombre: this.modUser.value.nombre!,
          apellidos: this.modUser.value.apellidos!,
          dni:dniValor,
          direccion: this.modUser.value.direccion|| '',
          telefono1: Number(this.modUser.value.telefono || 0),
          telefono2: Number(this.modUser.value.telefono2 || 0),
          tipo_id: this.modUser.value.tipo_id!,
          argazkia_url: 'foto.webp', 
          updated_at: new Date()
        };
        this.usersS.updateUser(modiUser).subscribe({
        next: () => {
          alert('Ondo modifikatu da');
         this.usersS.getUser();
          this.ezkutatutaMod = false;
          this.modUser.reset();
          window.location.reload();

        },
        error: (err) => {
          console.error('Errorea eguneratzean:', err);
          alert('Ez da eguneratu.');
        }
      });
    }
  }

}