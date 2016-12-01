import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OfficesComponent } from './components/offices/offices.component';
import { OfficeComponent } from './components/offices/office.component';
import { JurisdictionsComponent } from './components/jurisdictions/jurisdictions.component';
import {SystemAdministratorComponent} from "./components/system.administrators/system.administrator/system.administrator.component";
import {SystemAdministratorOfficesComponent} from "./components/system.administrators/system.administrator/system.administrator.offices.component";
import {SystemAdministratorGeneralComponent} from "./components/system.administrators/system.administrator/system.administrator.general.component"



export const ROUTES: Routes = [
  { path: '',      component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'office/:id', component: OfficeComponent },
  { path: 'offices', component: OfficesComponent },
  { path: 'jurisdictions', component: JurisdictionsComponent },
  {
    path: 'administrator/:id',
    component: SystemAdministratorComponent ,
    children: [
      {
        path: 'general',
        component: SystemAdministratorGeneralComponent
      },
      {
        path: 'offices',
        component: SystemAdministratorOfficesComponent
      }
    ]
  }
];
