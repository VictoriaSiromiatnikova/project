import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OfficesComponent } from './offices/offices.component';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'offices', component: OfficesComponent }
];
