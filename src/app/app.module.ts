import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from "ng2-modal";
import { FormSidebarModule } from "./shared/form.sidebar/form.sidebar.module";


/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { LoginComponent } from "./components/login/login.component";
import { OfficesComponent} from "./components/offices/offices.component";
import { OfficeComponent } from './components/offices/office.component';
import { UsStatesComponent } from './shared/us.states/us.states.component';
//import { JurisdictionsComponent} from "./components/jurisdictions/jurisdictions.component";
import { JurisdictionsModule } from "./components/jurisdictions/jurisdictions.module";
import { CustomTableComponent } from "./shared/table/custom.table.component";
import { DeleteLinkTableComponent } from "./shared/table/delete.link.component";
import { ModalDeleteComponent } from "./shared/modal/modal.delete.component";
import { ModalComponent } from "./shared/modal/modal.component";
import { SystemAdministratorsComponent } from "./components/system.administrators/system.administrators.component";
import { SystemAdministratorComponent } from "./components/system.administrators/system.administrator/system.administrator.component";
import { SystemAdministratorOfficesComponent } from "./components/system.administrators/system.administrator/system.administrator.offices.component";
import { AdminsOfficesComponent } from "./components/offices/admins.offices/admins.offices.component";
import { SystemAdministratorGeneralComponent } from "./components/system.administrators/system.administrator/system.administrator.general.component";
//providers
import { OfficeService } from "./components/offices/office.service";
import { AuthenticationService } from "./shared/services/authentication.service";
//import { JurisdictionService } from "./components/jurisdictions/jurisdiction.service";
import { StatesService } from "./shared/us.states/states.service";
import { SystemAdministratorsService } from "./components/system.administrators/system.administrators.service";





// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    CustomTableComponent,
    DeleteLinkTableComponent,
    ModalDeleteComponent,
    ModalComponent,
    UsStatesComponent,
    OfficeComponent,
    OfficesComponent,
    SystemAdministratorsComponent,
    SystemAdministratorComponent,
    //JurisdictionsComponent,
    SystemAdministratorOfficesComponent,
    AdminsOfficesComponent,
    SystemAdministratorGeneralComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    Ng2TableModule,
    PaginationModule,
    DropdownModule,
    ReactiveFormsModule,
    JurisdictionsModule,
    FormSidebarModule,
    HttpModule,
    ModalModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    AuthenticationService,
    OfficeService,
   // JurisdictionService,
    StatesService,
    SystemAdministratorsService
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

