import { Component, OnInit } from "@angular/core";
import { SystemAdministratorsService } from  "../system.administrators.service";
import { SystemAdministrator } from "../system.administrator";
import { EditLinkComponent } from './offices/edit-link.component';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'systemAdministrator',
    templateUrl: 'system.administrator.template.html'
})
export class SystemAdministratorComponent implements OnInit{
    private admin: SystemAdministrator = new SystemAdministrator();

    constructor(private systemAdministratorsService: SystemAdministratorsService,
                private route: ActivatedRoute){}
    ngOnInit() {
        let adminId = this.route.snapshot.params['id'];

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
