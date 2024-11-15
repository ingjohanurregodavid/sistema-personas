import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PersonaListComponent } from './components/persona/persona-list/persona-list.component';
import { PersonaFormComponent } from './components/persona/persona-form/persona-form.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'personas', component: PersonaListComponent},
    { path: 'personas/nueva', component: PersonaFormComponent, canActivate: [AuthGuard] },
    { path: 'personas/editar/:id', component: PersonaFormComponent, canActivate: [AuthGuard] },
];
