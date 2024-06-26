import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterDonatorComponent } from './auth/register-donator/register-donator.component';
import { RegisterEntityComponent } from './auth/register-entity/register-entity.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { DonatorComponent } from './donator/donator.component';
import { DonationRegistComponent } from './donation-regist/donation-regist.component';
import { EntitiesComponent } from './entities/entities.component';
import { DonatorDonationsComponent } from './donator-donations/donator-donations.component';
import { EntityComponent } from './entity/entity.component';
import { PlotlyComponent} from './plotly/plotly.component';
import { AuthGuard } from './auth.guard';
import { PointsComponent } from './points/points.component';
import { DonatorEditComponent } from './donator-edit/donator-edit.component';
import { EntityEditComponent } from './entity-edit/entity-edit.component';
import { DonatorProfileComponent } from './donator-profile/donator-profile.component';
import { EntityProfileComponent } from './entity-profile/entity-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


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
        path: 'donator',
        component: DonatorComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'profileDonator',
        component: DonatorProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'profileEntity',
        component: EntityProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'registDonation',
        component: DonationRegistComponent
    },
    {
        path: 'entities',
        component: EntitiesComponent
    },
    {
        path: 'donator/donations',
        component: DonatorDonationsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'entity',
        component: EntityComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'plotly',
        component: PlotlyComponent,
    },
    { 
        path: 'points', 
        component: PointsComponent,
        canActivate: [AuthGuard],
    },
    { 
        path: 'editDonator', 
        component: DonatorEditComponent,
        canActivate: [AuthGuard],
    },
    { 
        path: 'editEntity', 
        component: EntityEditComponent,
        canActivate: [AuthGuard], 
    },
    { 
        path: 'changePassword', 
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: '/login'
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule{}