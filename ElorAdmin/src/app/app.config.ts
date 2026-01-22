import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideTranslateService } from '@ngx-translate/core';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideTranslateService({
      loader:provideTranslateHttpLoader({
        prefix:'i18n/',
        suffix:'.json'
      }),
      defaultLanguage:'es',
      fallbackLang:'es',
      lang: localStorage.getItem('lang') || 'es'
    })
  ]
};
