import {Component, OnInit, ViewChild} from "@angular/core";
import {JurisdictionService} from "./jurisdiction.service";
import {Jurisdiction} from "./jurisdiction";
import {Router} from "@angular/router";

@Component({
    selector: 'jurisdictions',
    templateUrl: 'jurisdictions.template.html'
})
export class JurisdictionsComponent implements OnInit {
    @ViewChild('deleteModal') public deleteModal;
    public formErrors: Array<any> = [];
    public data: Jurisdiction[] = [];
    public rows:Array<any> = [];
    public totalItems:number = 0;

    constructor(private jurisdictionService: JurisdictionService,
                private router: Router){}

    ngOnInit() {
        this.loadAllJurisdictions();
    }

    /*
    * Load list of all Jurisdictions
    * */
    private loadAllJurisdictions(): void {
        this.jurisdictionService.getAll().subscribe(jurisdictions => {
            this.data = jurisdictions;
            this.totalItems = jurisdictions.length;
            this.rows = jurisdictions;
        });
    }

    /*
     * Event handler for edit Jurisdiction action
     * Redirect to Jurisdiction Details screen
     * */
    private onEditClick(row: Jurisdiction): void{
        this.router.navigate(['/jurisdiction', row.id]);
    }

    /*
     * Event handler for delete modal window
     * Process Jurisdiction remove functionality
     * */
    private removeJurisdiction(row: Jurisdiction): void {
        this.jurisdictionService.delete(row.id).subscribe(
            response => {
                this.deleteModal.close();
            },
            error => {
                this.formErrors = [error];
            });
    }
}
