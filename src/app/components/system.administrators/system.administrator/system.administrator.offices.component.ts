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
    public dataCopy: Office[] = [];
    public rows:Array<any> = [];
    public totalItems:number = 0;
    private officesIdToRemove: Array<any> = [];
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
        this.loadOfficesByAdmin(adminId);
    }

    /*
     * Load list of All Offices
     * */
    private loadOfficesByAdmin(adminId: number): void {
        this.officeService.getByAdminId(adminId).subscribe(offices => {
            this.rows = this.data = offices;
            //this.rows = offices;
            this.totalItems = offices.length;
            Object.assign(this.dataCopy, this.data);
        });
    }

    /*
     * Event handler for delete modal window
     * Remove Office from Table
     * */
    private removeOfficeFromAdmin(office: Office): void {
        let index: number = this.rows.indexOf(office, 0);
        if (index > -1) {
           // this.data.splice(index, 1);
            this.rows.splice(index, 1);
        }
        this.officesIdToRemove.push(office.id);
        this.deleteModal.close();
    }

    /*
     * Event handler for Cancel Functionality
     * Revert Changes of Offices list
     * */
    private cancelChanges(): void {
        this.officesIdToRemove = [];
        Object.assign(this.data, this.dataCopy);
    }

    /*
    * Event handler for Save Changes Functionality
    * Process remove Offices from Admin
    * */
    //private saveChanges(officesIds: Array<number>): void {
    private saveChanges(): void {
        this.systemAdministratorsService.deleteOfficesFromAdmin(this.officesIdToRemove).subscribe(
            response => {
                console.log(response);
                Object.assign(this.dataCopy, this.data);
            },
            error => {
                this.formErrors = [error];
            });
    }
}
