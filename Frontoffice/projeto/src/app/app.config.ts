import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './interceptors/auth.interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule  } from './app.routes';
import { provideRouter } from '@angular/router';
import { routes  } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],

  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi:true}, provideRouter(routes), provideHttpClient()],
  bootstrap: [AppComponent]
 

  
})


export class AppConfig{};
