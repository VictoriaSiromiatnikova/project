import { Component, OnInit } from "@angular/core";
import { SystemAdministratorsService } from "../system.administrators.service";
import { SystemAdministrator } from "../system.administrator";
import { EditLinkComponent } from './offices/edit-link.component';
import { ActivatedRoute } from "@angular/router";
import { Response } from "@angular/http";

@Component({
    selector: 'systemAdministratorGeneral',
    templateUrl: 'system.administrator.general.template.html'
})
export class SystemAdministratorGeneralComponent implements OnInit{
    private admin: SystemAdministrator = new SystemAdministrator();
    private adminCopy: SystemAdministrator = new SystemAdministrator();
    constructor(private systemAdministratorsService: SystemAdministratorsService,
                private route: ActivatedRoute){}
    ngOnInit() {
        let adminId = this.route.parent.snapshot.params['id'];

        if(adminId){
            this.systemAdministratorsService.getById(adminId).subscribe(
                (admin: SystemAdministrator) => {
                    this.admin = admin;
                    Object.assign(this.adminCopy, this.admin);
                },
                error => {
                    console.log(error.message);
                });
        }
    }

    private onSubmit():void {
        this.systemAdministratorsService.update(this.admin).subscribe(
            (response: Response) => {
                console.log(response);
                Object.assign(this.adminCopy, this.admin);
            },
            error => {
                console.log(error);
            });
    }

    private onCancel(): void {
        Object.assign(this.admin, this.adminCopy);
    }
}
