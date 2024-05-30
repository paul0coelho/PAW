import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { DonatorComponent } from './donator/donator.component';
import { EntityProfileComponent } from './entity-profile/entity-profile.component';
import { DonationRegistComponent } from './donation-regist/donation-regist.component';
import { EntitiesComponent } from './entities/entities.component';
import { DonatorProfileComponent } from './donator-profile/donator-profile.component';
import { DonatorDonationsComponent } from './donator-donations/donator-donations.component';
import { EntityDonationsComponent } from './entity-donations/entity-donations.component';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
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
        path: 'donator/profile/:id',
        component: DonatorProfileComponent,
    },
    {
        path: 'registDonation',
        component: DonationRegistComponent,
    },
    {
        path: 'entities',
        component: EntitiesComponent,
    },
    {
        path: 'entity/profile/:id',
        component: EntityProfileComponent,
    },
    {
        path: 'donator/donations/:id',
        component: DonatorDonationsComponent,
    },
    {
        path: 'entity/donations/:id',
        component: EntityDonationsComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule{}