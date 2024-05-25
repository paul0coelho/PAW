import { Routes } from '@angular/router';
import { EntityComponent } from './entity/entity.component';
import { EntitiesComponent } from './entities/entities.component';

export const routes: Routes = [
    { path: 'entities/show/:id', component: EntityComponent },
    { path: 'entities', component: EntitiesComponent }
];
