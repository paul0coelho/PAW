import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './interceptors/auth.interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterDonatorComponent } from './auth/register-donator/register-donator.component';
import { RegisterEntityComponent } from './auth/register-entity/register-entity.component';
import { AppRoutingModule } from './app.routes';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { DonationRegistComponent } from './donation-regist/donation-regist.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterDonatorComponent,
    RegisterEntityComponent,
    DonationRegistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true },
    provideRouter(routes),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppConfig { }
