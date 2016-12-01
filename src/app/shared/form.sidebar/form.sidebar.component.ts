import {Component} from '@angular/core';


export interface IRoute {
    ref: string[],
    name: string,
    label: string
}

@Component({
    selector: 'formsidebar',
    templateUrl: 'form.sidebar.template.html'
})
export class FormSidebarComponent {
    private routes: IRoute[];

    constructor() {
        this.routes = [
            { name: 'general', ref: ['./general'] , label: "General Information"},
            { name: 'offices', ref: ['./offices'], label: "Assigned Offices" },
        ];
    }
}