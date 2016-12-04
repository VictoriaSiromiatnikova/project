import {Component, OnInit, OnChanges, ViewChild, Input, Output, EventEmitter} from "@angular/core";
import { OfficeService } from "../../offices/office.service";
import { Office } from "../../offices/office";

@Component({
    selector: 'offices-by-admin',
    templateUrl: 'admins.offises.template.html'
})
export class AdminsOfficesComponent implements OnInit{
    @ViewChild('deleteModal') public deleteModal;
    @Input() adminId: any;
    @Input() officesIdsToRemove: Array<any> = [];

    private formErrors: Array<any> = [];
    public data: Office[] = [];
    public dataCopy: Office[] = [];
    public totalItems:number = 0;

    constructor(private officeService: OfficeService){}

    ngOnInit() {
        this.loadOfficesByAdmin(this.adminId);
    }

    /*
     * Event handler for Cancel Functionality
     * Revert Changes of Offices list
     * */
    private onCancelChanges(): void {
        this.officesIdsToRemove.length = 0;
        Object.assign(this.data, this.dataCopy);
    }

    /*
     * Load list of All Offices
     * */
    private loadOfficesByAdmin(adminId: number): void {
        this.officeService.getByAdminId(adminId).subscribe(offices => {
            this.data = offices;
            this.totalItems = offices.length;
            Object.assign(this.dataCopy, this.data);
        });
    }

    /*
     * Event handler for delete modal window
     * Remove Office from Table
     * */
    private removeOfficeFromAdmin(office: Office): void {
        let index: number = this.data.indexOf(office, 0);
        if (index > -1) {
            this.data.splice(index, 1);
        }

        this.officesIdsToRemove.push(office.id);
        this.deleteModal.close();
    }
}
