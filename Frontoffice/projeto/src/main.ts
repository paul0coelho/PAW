import { bootstrapApplication } from '@angular/platform-browser';
import { AppConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/*bootstrapApplication(AppComponent, AppConfig)
  .catch((err) => console.error(err));
*/
  platformBrowserDynamic().bootstrapModule(AppConfig)
  .catch(err => console.error(err));
