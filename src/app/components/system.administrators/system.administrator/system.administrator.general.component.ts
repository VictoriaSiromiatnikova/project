import { Component, OnInit } from "@angular/core";
import { SystemAdministratorsService } from "../system.administrators.service";
import { StatesService } from "../../../shared/us.states/states.service"
import { SystemAdministrator } from "../system.administrator";
import { EditLinkComponent } from './offices/edit-link.component';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'systemAdministratorGeneral',
    templateUrl: 'system.administrator.general.template.html'
})
export class SystemAdministratorGeneralComponent implements OnInit{
    private admin: SystemAdministrator = new SystemAdministrator();
    private states: Array<any> = [];
    constructor(private systemAdministratorsService: SystemAdministratorsService,
                private route: ActivatedRoute,
                private router: Router){}
    ngOnInit() {
        let adminId = this.route.parent.snapshot.params['id'];

        if(adminId){
            this.systemAdministratorsService.getById(adminId).subscribe(
                (admin: SystemAdministrator) => {
                    this.admin = admin;
                },
                error => {
                    console.log(error.message);
                });
        }
    }
}
