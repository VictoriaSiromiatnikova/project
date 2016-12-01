import {Component, OnInit, ViewChild} from "@angular/core";
import {SystemAdministratorsService} from  "../system.administrators.service";
import {SystemAdministrator} from "../system.administrator";
import {EditLinkComponent} from './offices/edit-link.component';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'systemAdministrator',
    templateUrl: 'system.administrator.template.html'
})
export class SystemAdministratorComponent implements OnInit{
    private admin: SystemAdministrator = new SystemAdministrator();

    constructor(private systemAdministratorsService: SystemAdministratorsService,
                private route: ActivatedRoute,
                private router: Router){}
    ngOnInit() {
        let adminId = this.route.snapshot.params['id'];

        if(adminId){
            this.systemAdministratorsService.getById(adminId).subscribe(
                (admin: SystemAdministrator) => {
                    this.admin = admin;
                },
                error => {
                    /*Mock data*/
                    this.admin ={
                        "id": 1,
                        "firstName": "Bob",
                        "lastName": "Smith",
                        "phone": "303-784-9834",
                        "email": "email@email.com",
                        "state": "CA"
                    }
                });
        }
    }

}
