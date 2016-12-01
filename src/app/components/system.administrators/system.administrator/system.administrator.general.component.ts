import {Component, OnInit, ViewChild} from "@angular/core";
import {SystemAdministratorsService} from "../system.administrators.service";
import {StatesService} from "../../../shared/services/states.service"
import {SystemAdministrator} from "../system.administrator";
import {EditLinkComponent} from './offices/edit-link.component';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'systemAdministratorGeneral',
    templateUrl: 'system.administrator.general.template.html'
})
export class SystemAdministratorGeneralComponent implements OnInit{
    private admin: SystemAdministrator = new SystemAdministrator();
    private states: Array<any> = [];
    constructor(private systemAdministratorsService: SystemAdministratorsService,
                private statesService: StatesService,
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
        this.loadAllStates();
    }
    private loadAllStates(){
        this.statesService.getAll().subscribe(states => this.states = states);
    }

}
