import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { DonatorComponent } from './donator/donator.component';
import { EntityComponent } from './entity/entity.component';
import { DonationRegistComponent } from './donation-regist/donation-regist.component';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'welcomePage',
        component: InitialPageComponent,
    },
    {
        path: 'donator',
        component: DonatorComponent,
    },
    {
        path: 'entities/show/:id',
        component: EntityComponent,
    },
    {
        path: 'registDonation',
        component: DonationRegistComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule{}