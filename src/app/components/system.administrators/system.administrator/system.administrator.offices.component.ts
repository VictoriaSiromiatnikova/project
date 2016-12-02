import { Component, OnInit, ViewChild } from "@angular/core";
import { SystemAdministratorsService } from  "../system.administrators.service";
import { SystemAdministrator } from "../system.administrator";
import { Router, ActivatedRoute } from "@angular/router";
import { OfficeService } from "../../offices/office.service";
import { Office } from "../../offices/office";

@Component({
    selector: 'systemAdministratorOffices',
    templateUrl: 'system.administrator.offices.template.html'
})
export class SystemAdministratorOfficesComponent implements OnInit{
    @ViewChild('deleteModal') public deleteModal;
    public formErrors: Array<any> = [];
    public data: Office[] = [];
    public rows:Array<any> = [];
    public totalItems:number = 0;
    private admin: SystemAdministrator = new SystemAdministrator();

    constructor(private systemAdministratorsService: SystemAdministratorsService,
                private route: ActivatedRoute,
                private router: Router,
                private officeService: OfficeService){}
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
        this.loadAllOffices();
    }

    /*
     * Load list of All Offices
     * */
    private loadAllOffices() {
        this.officeService.getAll().subscribe(offices => {
            //cut Mock Data
            offices = offices.slice(1, 5);
            this.data = offices;
            this.totalItems = offices.length;
            this.rows = offices;
        });
    }

    /*
     * Event handler for delete modal window
     * Process remove Office from Admin functionality
     * */
    private removeOfficeFromAdmin(row: Office): void {
        this.officeService.delete(row.id).subscribe(
            response => {
                console.log(response)
                this.deleteModal.close();
            },
            error => {
                this.formErrors = [error];
            });
    }
}
