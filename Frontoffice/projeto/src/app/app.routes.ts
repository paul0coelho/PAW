import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterDonatorComponent } from './auth/register-donator/register-donator.component';
import { RegisterEntityComponent } from './auth/register-entity/register-entity.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { DonatorComponent } from './donator/donator.component';
import { EntityProfileComponent } from './entity-profile/entity-profile.component';
import { DonationRegistComponent } from './donation-regist/donation-regist.component';
import { EntitiesComponent } from './entities/entities.component';
import { DonatorProfileComponent } from './donator-profile/donator-profile.component';
import { DonatorDonationsComponent } from './donator-donations/donator-donations.component';
import { EntityComponent } from './entity/entity.component';
import { PlotlyComponent} from './plotly/plotly.component';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'registerDonator',
        component: RegisterDonatorComponent,
    },
    {
        path: 'registerEntity',
        component: RegisterEntityComponent,
    },
    {
        path: 'welcomePage',
        component: InitialPageComponent,
    },
    {
        path: 'donator/:id',
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
        path: 'entity/:id',
        component: EntityComponent,
    },
    {
        path: 'plotly',
        component: PlotlyComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule{}