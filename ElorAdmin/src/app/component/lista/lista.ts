import { Component, inject } from '@angular/core';
import { User, Reunion, Tipo } from '../../interface/interfaces';
import { Users } from '../../services/users';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Bilera } from '../../services/bilera';
import { Mota } from '../../services/mota';
import { FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslatePipe, NgxPaginationModule],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista {
 bileraS: Bilera = inject(Bilera);
  usersS: Users = inject(Users);
  motaS: Mota = inject(Mota);

  reunionList: Reunion[] = [];
  motaList: Tipo[] = [];
  kopuruakArray: number[] = [];
  selected: string = "Guztiak";
  aukeratu: string[] = [];
  filteredList: User[] = [];
  UserList: User[] = [];
  
  users$!: Observable<User[]>; 
  bilerak$!: Observable<Reunion[]>;
  motak$!: Observable<Tipo[]>;


  currentUser: User | undefined; 
  ezkutatuta = false;
  ezkutatutaMod = false;
  currentPage = 1;
  idEditatzeko = 0;
  bilatuTextua=''

  newUser = new FormGroup({
    img: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.pattern('^[0-9]{8}[A-Za-z]$')]),
    direccion: new FormControl(''),
    telefono: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
    telefono2: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
    tipo_id: new FormControl(null, [Validators.required])
  });

  modUser = new FormGroup({
    img:new FormControl(''),
    nombre: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    username: new FormControl(''),
    apellidos: new FormControl(''),
    password: new FormControl(''),
    dni: new FormControl('', [Validators.pattern('^[0-9]{8}[A-Za-z]$')]),
    direccion: new FormControl(''),
    telefono: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
    telefono2: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
    tipo_id: new FormControl<number | null>(null)
  });

  constructor(private router: Router) {
 //Hartu erabiltzailea
    const datuak = sessionStorage.getItem('usuarioLogueado');

    if (datuak) {
      this.currentUser = JSON.parse(datuak);
      console.log('Usuario logueado:', this.currentUser);
      this.kargatuDatuak();

    } else {
      console.warn('Ez dago sesiorik sortuta');
      this.router.navigate(['/login']);
    }
  }

  kargatuDatuak() {
    //Hartu erabiltzaile guztiak
    this.users$ = this.usersS.getUser();
    this.users$.subscribe({
      next: (users: User[]) => {
        console.log(users);
        this.UserList = users;
        this.kopuruak();
        this.filtratu("Guztiak");
        console.log("ok");
      },
      error: err => console.log(err)
    });

    //Hartu bilera guztiak
    this.bilerak$ = this.bileraS.getBilera();
    this.bilerak$.subscribe({
      next: (bileraList: Reunion[]) => {
        console.log(bileraList);
        this.reunionList = bileraList;
        this.kopuruak();
      },
      error: err => console.log(err)
    });

    //Hartu mota guztiak
    this.motak$ = this.motaS.getMota();
    this.motak$.subscribe({
      next: (motaList: Tipo[]) => {
        console.log(motaList);
        this.motaList = motaList;
        //Hartu motaren izenak select option-rentzat
        this.aukeratu = [...new Set(this.motaList.map(j => j.name))];
        console.log("aukeratu: " + this.aukeratu);
      },
      error: err => console.log(err)
    });
  }

//Goiko kopuruak
  kopuruak(): void {
    let ikKop = 0;
    let irKop = 0;
    let gaurkoBilKop =0;
    const gaurStr = new Date().toISOString().split('T')[0];

  
    if (this.UserList) {
        ikKop = this.UserList.filter(u => u.tipo_id === 4).length;
        irKop = this.UserList.filter(u => u.tipo_id === 3).length;
    }
    gaurkoBilKop = this.reunionList.filter(bilera => {
      const bileraDataStr = new Date(bilera.fecha).toISOString().split('T')[0];
      return bileraDataStr === gaurStr;
    }).length;
    this.kopuruakArray = [ikKop, irKop, gaurkoBilKop];
  }
//Select option
  filtratu(selectedValue: string) {
    console.log("filtratu");
    if (selectedValue === 'Guztiak') {
      //Filtratu erabiltzaile guztiak
      this.filteredList = [...this.UserList];
    } else {
      //Hartu aukeratutako mota
      const selectedMota = this.motaList.find(m => m.name === selectedValue);
      if (selectedMota) {
        const selectedMotaId = selectedMota.id;
        //Listan erakutsi mota horretako erabiltzaileak
        this.filteredList = this.UserList.filter(user => user.tipo_id === selectedMotaId);
      } else {
        this.filteredList = [...this.UserList];
      }
    }
    console.log(this.filteredList);
  }
  //bilatzailea
  bilatu(){
    //Hasi erabiltzaile guztiekin
    let resultados = [...this.UserList];
    //Ez bada "Guztiak" bilatu izena
    if (this.selected !== 'Guztiak') {
       const motaEncontrada = this.motaList.find(m => m.name === this.selected);
       if (motaEncontrada) {
         resultados = resultados.filter(u => u.tipo_id === motaEncontrada.id);
       }
    }
    //Kendu espazioak eta pasatu guztia minuskulara
    const texto = this.bilatuTextua.trim().toLowerCase();
    
    if (texto !== '') {
        resultados = resultados.filter(user => {
          //Bilatu izena, abizena email edo dni-aren arabera 
          return (
                user.nombre.toLowerCase().includes(texto) ||
                user.apellidos.toLowerCase().includes(texto) ||
                user.email.toLowerCase().includes(texto) ||
                (user.dni && user.dni.toLowerCase().includes(texto))
            );
        });
    }
    this.filteredList = resultados;
    this.currentPage = 1;

  }

  kendu(id: number) {
    if(confirm('Ziur kendu nahi duzula?')) { 
        this.usersS.deleteUser(id).subscribe({
        next: () => {
            console.log(`Erabiltzaile ${id} kenduta`);
            this.users$ = this.usersS.getUser();
            window.location.reload();
        },
        error: (err) => console.error('Errorea kentzean:', err)
        });
    }
  }
//Sortu erabiltzailea
  gehitu() {
    if (this.newUser.valid) {
      
      this.users$.subscribe({
        next: (users) => {

          const AddUser: any = {
            email: this.newUser.value.email!,
            username: this.newUser.value.username!,
            password: this.newUser.value.password!,
            nombre: this.newUser.value.nombre!,
            apellidos: this.newUser.value.apellidos!,
            dni: this.newUser.value.dni || '',
            direccion: this.newUser.value.direccion || '',
            telefono1: this.newUser.value.telefono ? Number(this.newUser.value.telefono) : null,
            telefono2: this.newUser.value.telefono2 ? Number(this.newUser.value.telefono2) : null,
            tipo_id: Number(this.newUser.value.tipo_id!),
            argazkia_url: this.newUser.value.img ||'foto.webp',
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



  erakutsiForm() {
    this.ezkutatuta = !this.ezkutatuta;
  }

  atzera() {
    this.ezkutatuta = false;
    this.ezkutatutaMod = false;
  }

  formMod(user: User) {
    this.ezkutatutaMod = true;
    this.idEditatzeko = user.id;
    this.modUser.patchValue({
      nombre: user.nombre,
      email: user.email,
      username: user.username,
      apellidos: user.apellidos,
      dni: user.dni,
      direccion: user.direccion,
      telefono: user.telefono1 ? user.telefono1.toString() : '',
      telefono2: user.telefono2 ? user.telefono2.toString() : '',
      tipo_id: user.tipo_id,
      img:user.argazkia_url,
      password: user.password
    });
  }

  modifikatu() {
    if (this.modUser.valid) {
      }
      const modiUser: User = {
        id: this.idEditatzeko,
        email: this.modUser.value.email!,
        username: this.modUser.value.username!,
        password: this.modUser.value.password!,
        nombre: this.modUser.value.nombre!,
        apellidos: this.modUser.value.apellidos!,
        dni: this.modUser.value.dni|| '',
        direccion: this.modUser.value.direccion || '',
        telefono1: Number(this.modUser.value.telefono) || null,
        telefono2: Number(this.modUser.value.telefono2)|| null,
        tipo_id: this.modUser.value.tipo_id!,
        argazkia_url: this.modUser.value.img ||'foto.webp',
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
