import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, Ikastetxea } from '../../interface/interfaces';
import { Users } from '../../services/users';
import { Ikastetxeak } from '../../services/ikastetxeak';
import { AsyncPipe, NgClass } from '@angular/common'; // Importar NgClass
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-bilerak',
  standalone: true,
  imports: [RouterLink, AsyncPipe, ReactiveFormsModule, NgClass], // Añadir ReactiveFormsModule y NgClass
  templateUrl: './add-bilerak.html',
  styleUrl: './add-bilerak.css',
})
export class AddBilerak {
  // Inyecciones
  private userService = inject(Users);
  private ikastetxeService = inject(Ikastetxeak);
  private sanitizer = inject(DomSanitizer);
  private fb = inject(FormBuilder);

  // Variables de datos
  user: User | undefined;
  irakasleak$!: Observable<User[]>;
  ikastetxeak$!: Observable<Ikastetxea[]>;
  mapaUrl: SafeResourceUrl | undefined;

  // Formulario
  bileraForm: FormGroup;

  constructor() {
    // 1. Inicializar Formulario
    this.bileraForm = this.fb.group({
      centroId: ['', Validators.required],   // Guardará el CCEN
      profesorId: ['', Validators.required], // Guardará el ID del profe
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });

    // 2. Cargar Usuario Logueado
    let datuak = sessionStorage.getItem('usuarioLogueado');
    if (datuak) {
      this.user = JSON.parse(datuak);
    }

    // 3. Cargar Centros
    this.ikastetxeak$ = this.ikastetxeService.getIkastetxeak();

    // 4. Cargar Profesores (Filtrando correctamente con pipe y map)
    // Esto asegura que el HTML solo reciba los tipo_id 3
    this.irakasleak$ = this.userService.getUser().pipe(
      map(users => users.filter(u => u.tipo_id === 3))
    );
  }

  // --- MÉTODOS DE SELECCIÓN ---

  seleccionarCentro(centro: Ikastetxea) {
    this.bileraForm.patchValue({ centroId: centro.CCEN }); // Guardar en formulario
    this.cargarMapa(centro.LATITUD, centro.LONGITUD);      // Actualizar mapa
  }

  seleccionarProfesor(profe: User) {
    this.bileraForm.patchValue({ profesorId: profe.id });
  }

  cargarMapa(lat: number, lon: number) {
    if (lat && lon) {
      // Url corregida para embed de Google Maps
      const url = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
      this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  guardarReunion() {
    if (this.bileraForm.valid) {
      console.log('Datos a enviar:', this.bileraForm.value);
      // Aquí llamarías a tu servicio para guardar: 
      // this.reunionesService.add(this.bileraForm.value).subscribe(...)
    } else {
      alert('Por favor, selecciona centro, profesor, fecha y hora.');
    }
  }
}