import {Component} from '@angular/core';
import { AuthenticationService } from '../services/index';

export interface IRoute {
    ref: string[],
    name: string
}

@Component({
    selector: 'sidebar',
    templateUrl: 'sidebar.html'
})
export class SidebarComponent {
    navRoutes: IRoute[];

    constructor(private authService: AuthenticationService) {
        this.navRoutes = [
            { name: 'Offices', ref: ['./offices'] },
            { name: 'Jurisdictions', ref: ['./offices'] },
            { name: 'Users', ref: ['./offices'] },
            { name: 'Reports', ref: ['./offices'] },
            { name: 'Fee Schedules', ref: ['./offices'] },
            { name: 'Workflows', ref: ['./offices'] },
            { name: 'Permit Types', ref: ['./offices'] }
        ];
    }

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }
}