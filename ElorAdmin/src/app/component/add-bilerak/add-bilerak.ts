import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, Ikastetxea, Reunion, Estado } from '../../interface/interfaces';
import { Users } from '../../services/users';
import { Ikastetxeak } from '../../services/ikastetxeak';
import { AsyncPipe } from '@angular/common'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bilera } from '../../services/bilera';
import { TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-add-bilerak',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, TranslatePipe, FormsModule], 
  templateUrl: './add-bilerak.html',
  styleUrl: './add-bilerak.css',
})
export class AddBilerak {
  private userService = inject(Users);   
  private ikastetxeService = inject(Ikastetxeak); 
  private sanitizer = inject(DomSanitizer);
  private bileraService = inject(Bilera);

 
  user: User | undefined;     
  irakasleak$!: Observable<User[]>; 
  ikastetxeak$!: Observable<Ikastetxea[]>; 
  bilerak$!: Observable<Reunion[]>; 
  
  bilerak: Reunion[] = [];       
  filteredList: Ikastetxea[] = []; 
  allIkastetxeak: Ikastetxea[] = []; 
  
  mapaUrl: SafeResourceUrl | undefined; 
  

  selected: string = "Guztiak";  
  minDate: string = '';        
  aukeratu: string[] = [];       

 
  bileraForm = new FormGroup({
     centro: new FormControl<number | null>(null, [Validators.required]),  
     profesorId: new FormControl<number | null>(null, [Validators.required]),
     titulo: new FormControl(''),
     asunto: new FormControl(''),
     aula:new FormControl(''),
     fecha: new FormControl('', [Validators.required]),
     hora: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private route: ActivatedRoute) {
    // 1. Erabiltzailea kargatu saiotik
    const datuak = sessionStorage.getItem('usuarioLogueado');
    if (datuak) {
      this.user = JSON.parse(datuak);
      this.gaurkoEgunaKalkulatu();
    }

    //Ikastetxeak kargatu
    this.ikastetxeak$ = this.ikastetxeService.getIkastetxeak();
    this.ikastetxeak$.subscribe({
      next: (data) => {
        this.allIkastetxeak = data;      
        this.filteredList = [...data];   // Hasieran denak erakutsi
        // Probintziak bakarrik atera (duplikatuak kenduz Set erabilita)
        this.aukeratu = [...new Set(this.allIkastetxeak.map(i => i.DTERRC))];
      },
      error: (err) => console.error('Errorea:', err)
    });

    //Irakasleak kargatu 
    //pipe datuak eraldatu eta map array osoa hartzeko eta filtratzeko
    this.irakasleak$ = this.userService.getUser().pipe(
    map(users => users.filter(u => u.tipo_id === 3))
);
    //Bilerak kargatu 
    this.bilerak$ = this.bileraService.getBilera();
    this.bilerak$.subscribe({
      next: (allBilerak) => {
        this.bilerak = allBilerak;
      }
    });
  }


  ikastetxeaAukeratu(centro: Ikastetxea) {
    // Formularioan balioa ezarri
    this.bileraForm.patchValue({ centro: centro.CCEN });
    // Mapa kargatu koordenatu horiekin
    this.mapaKargatu(centro.LONGITUD, centro.LATITUD);
  }

  irakasleaAukeratu(profe: User) {
    this.bileraForm.patchValue({ profesorId: profe.id });
  }

  // Egutegian gaur baino lehenagoko egunak ezin aukeratzeko
  gaurkoEgunaKalkulatu(){
    const gaur = new Date();
    const urte = gaur.getFullYear();
    const hilea = ('0' + (gaur.getMonth() + 1)).slice(-2); // 0 gehitu 
    const eguna = ('0' + gaur.getDate()).slice(-2);

    this.minDate = `${urte}-${hilea}-${eguna}`;
  }

//Mapa kargatu
  mapaKargatu(lat: number, lon: number) {
    if (lat && lon) {
      const url = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
      this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }


  gehitu() {
    if (this.bileraForm.valid && this.user) {
      
      const hurrengoId = this.bilerak.length > 0
           ? Math.max(...this.bilerak.map(h => h.id_reunion)) + 1
           : 1;
           
      const fechaString = this.bileraForm.value.fecha; 
      const horaString = this.bileraForm.value.hora; 
      const fechaCompleta = new Date(`${fechaString}T${horaString}`);

      const addBilera: Reunion = {
          id_reunion: hurrengoId,
          estado: Estado.pendiente, //hasieran pendiente
          profesor_id: Number(this.bileraForm.value.profesorId), 
          alumno_id: this.user.id, 
          id_centro: Number(this.bileraForm.value.centro), 
          titulo: this.bileraForm.value.titulo || '',
          asunto: this.bileraForm.value.asunto || '',
          aula:this.bileraForm.value.aula || '',
          fecha: fechaCompleta, 
          created_at: new Date(),
          updated_at: new Date()
      };

  
      this.bileraService.addBilera(addBilera).subscribe({
        next: (sortuBilera) => {
          console.log("Sortu da bilera", sortuBilera);
          alert('Bilera sortuta'); 
          
        },
        error: (err) => console.error(err)
      });

    } else {
      alert('Por favor, completa todos los campos (Centro, Profesor, Fecha y Hora).');
    }
  }

 
  filtratu(selectedValue: string) {
    console.log("filtratu", selectedValue);
    if (selectedValue === 'Guztiak') {
      // Denak erakutsi
      this.filteredList = [...this.allIkastetxeak];
    } else {
      // Aukeratutako probintziakoak bakarrik (DTERRC eremua)
      const probintziakoak = this.allIkastetxeak.filter(m => m.DTERRC === selectedValue);
      this.filteredList = [...probintziakoak];
    }
    console.log(this.filteredList);
  }

//Eraman ikastetxe horrira
  ikastetxeaOrria(id: number) {
    sessionStorage.setItem('ikastetxeaHartu', JSON.stringify(id));
    console.log("Bilatu id-a:", id);
    // URL erlatiboa 
    this.router.navigate(['../ikastetxea', id], { relativeTo: this.route })
  }
}