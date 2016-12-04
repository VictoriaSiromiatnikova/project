import { Component, OnInit, ViewChild } from "@angular/core";
import { OfficeService } from "./office.service";
import { Office } from "./office";
import { Router } from "@angular/router";

@Component({
    selector: 'offices',
    templateUrl: 'offices.template.html'
})
export class OfficesComponent implements OnInit{
    @ViewChild('deleteModal') public deleteModal;
    public formErrors: Array<any> = [];
    public data: Office[] = [];
    public totalItems:number = 0;

    constructor(private officeService: OfficeService,
              private router: Router){}

    ngOnInit() {
        this.loadAllOffices();
    }

    /*
    * Load list of All Offices
    * */
    private loadAllOffices() {
        this.officeService.getAll().subscribe(offices => {
          this.data = offices;
          this.totalItems = offices.length;
        });
    }

    /*
     * Event handler for edit office action
     * Redirect to Office Details screen
     * */
    private onEditClick(row: Office): void{
        this.router.navigate(['/office', row.id]);
    }

    /*
     * Event handler for 'Create New Office' button
     *  Redirect to Office Details screen
     * */
    private onCreateNewOffice(): void{
        this.router.navigate(['/office/', '']);
    }

    /*
    * Event handler for delete modal window
    * Process office remove functionality
    * */
    private removeOffice(row: Office): void {
        this.officeService.delete(row.id).subscribe(
            response => {
              this.deleteModal.close();
            },
            error => {
              this.formErrors = [error];
            });
    }
}
