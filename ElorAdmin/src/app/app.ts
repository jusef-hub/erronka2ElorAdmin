import { Component, importProvidersFrom, signal, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ElorAdmin');
  public translate=inject(TranslateService);
  constructor(){
    this.translate.addLangs(['eu', 'es']);
    this.translate.setFallbackLang('es');
    this.translate.use('es');
  }
    aldatuHizkuntza(idioma:string){
      console.log(idioma);
      this.translate.use(idioma.toLowerCase());
    }
  
}
