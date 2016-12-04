import { Component, OnInit, ViewChild } from "@angular/core";
import { SystemAdministratorsService } from  "../system.administrators.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'systemAdministratorOffices',
    templateUrl: 'system.administrator.offices.template.html'
})
export class SystemAdministratorOfficesComponent implements OnInit{
    @ViewChild('deleteModal') public deleteModal;
    public formErrors: Array<any> = [];
    private data: Array<any> = [];
    private dataCopy: Array<any> = [];
    private officesIdsToRemove: Array<any> = [];
    private adminId: number;

    constructor(private systemAdministratorsService: SystemAdministratorsService,
                private route: ActivatedRoute){}
    ngOnInit() {
        this.adminId = this.route.parent.snapshot.params['id'];
    }


    /*
    * Event handler for Save Changes Functionality
    * Process remove Offices from Admin
    * */
    //private saveChanges(officesIds: Array<number>): void {
    private saveChanges(): void {
        if(this.officesIdsToRemove.length) {
            this.systemAdministratorsService.deleteOfficesFromAdmin(this.officesIdsToRemove).subscribe(
                response => {
                    console.log(response);
                    Object.assign(this.dataCopy, this.data);
                },
                error => {
                    this.formErrors = [error];
                });
        }
    }
}
