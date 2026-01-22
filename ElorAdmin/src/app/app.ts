import { Component, importProvidersFrom, signal, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('ElorAdmin');
  public translate = inject(TranslateService);

  constructor() {
  }

  aldatuHizkuntza(lang: string) {
    console.log("Aldatu hizkuntza:", lang);
    this.translate.use(lang);
    //LocalStorage: nabigatzaile barruan nahi dudan datuak gorde eta datuak mantenduko dira
    //session Storage:sesioaren barruan mantenduko dira. Itxi datuak galdu
    localStorage.setItem('lang', lang)
  }
  
}
