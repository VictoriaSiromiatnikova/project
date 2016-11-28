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
    navRoutesAdmin: IRoute[];
    navRoutesAll: IRoute[];

    constructor(private authService: AuthenticationService) {
        this.navRoutesAdmin = [
            { name: 'Offices', ref: ['./offices'] },
            { name: 'Jurisdictions', ref: ['./jurisdictions'] },
            { name: 'Users', ref: ['./offices'] },
            { name: 'Reports', ref: ['./offices'] },
            { name: 'Fee Schedules', ref: ['./offices'] },
            { name: 'Workflows', ref: ['./offices'] },
            { name: 'Permit Types', ref: ['./offices'] }
        ];
        this.navRoutesAll = [
            { name: 'Dashboard', ref: ['./offices'] },
            { name: 'Permits', ref: ['./offices'] },
            { name: 'Contractors', ref: ['./offices'] },
            { name: 'Property Addresses', ref: ['./offices'] },
            { name: 'Documents', ref: ['./offices'] }
        ];
    }

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }
}