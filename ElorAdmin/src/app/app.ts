import { Component, importProvidersFrom, signal, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('ElorAdmin');
  public translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['eu', 'es']);
    this.translate.setDefaultLang('eu'); 
    this.translate.use('eu');
  }

  aldatuHizkuntza(idioma: string) {
    console.log("Cambiando a:", idioma);
    this.translate.use(idioma);
  }
  
}
