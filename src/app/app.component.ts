/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
  <div id="wrapper">
      <menu>
         <nav role="navigation">
          <span class="navbar-item">
            <a [routerLink]=" ['./offices'] ">
              Offices
            </a>
          </span>
          <span class="navbar-item">
            <a [routerLink]=" ['./offices'] ">
              Jurisdictions
            </a>
          </span>
          <span  class="navbar-item">
             <a [routerLink]=" ['./offices'] ">
              Users
            </a>
          </span>
          <span  class="navbar-item">
            <a [routerLink]=" ['./offices'] ">
              Reports
            </a>
          </span>
          <span  class="navbar-item">
            <a [routerLink]=" ['./offices'] ">
              Fee Schedules
            </a>
          </span>
          <span  class="navbar-item">
            <a [routerLink]=" ['./offices'] ">
              Workflows
            </a>
          </span>
          <span  class="navbar-item">
            <a [routerLink]=" ['./offices'] ">
              Permit Types
            </a>
          </span>
        </nav>
      </menu>
     
  
      <main>
        <router-outlet></router-outlet>
      </main>
  </div>
  `
})
export class AppComponent {
  name = 'Project Connect';
  url = 'https:/test';

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
