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
import { AuthGuard } from './auth.guard';
import { DonatorProfileComponent } from './donator-profile/donator-profile.component'; 
import { EntityProfileComponent } from './entity-profile/entity-profile.component';
import { DonatorEditComponent } from './donator-edit/donator-edit.component';
import { EntityEditComponent } from './entity-edit/entity-edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterDonatorComponent,
    RegisterEntityComponent,
    DonationRegistComponent,
    DonatorProfileComponent,
    EntityProfileComponent,
    DonatorEditComponent,
    EntityEditComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true },
    provideRouter(routes),
    provideHttpClient(),
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppConfig { }
