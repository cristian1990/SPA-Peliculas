import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

//Indico que quiero utilizar el AppModule, para inicializar la aplicacion
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
