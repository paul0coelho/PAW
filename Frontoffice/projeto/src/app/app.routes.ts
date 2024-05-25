import { Routes } from '@angular/router';
import { EntityComponent } from './entity/entity.component';

export const routes: Routes = [
    { path: 'entities/show/:id', component: EntityComponent }
];
