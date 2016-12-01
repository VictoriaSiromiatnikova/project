import {Component, OnInit, ViewChild} from "@angular/core";
import {JurisdictionService} from "./jurisdiction.service";
import {Jurisdiction} from "./jurisdiction";

@Component({
    selector: 'jurisdictions',
    templateUrl: 'jurisdictions.template.html'
})
export class JurisdictionsComponent implements OnInit {
    @ViewChild('deleteModal') public deleteModal;
    public formErrors: Array<any> = [];
    public data: Jurisdiction[] = [];
    public rows:Array<any> = [];
    public config: any ={
        paging: true,
        actions: true,
        sorting: {columns: this.columns},
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered']
    }
    public columns:Array<any> = [
        {title: 'Name', name: 'name', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by Name'}},
        {title: 'Jurisdictions Abbreviation', sort: 'asc', name: 'jurisdictionAbbreviation', },
        {title: 'Office', sort: 'asc', name: 'office', },
        {title: 'State', name: 'state', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by State'}},
        {title: 'Phone', sort: 'asc', name: 'phone' },
        {title: 'Creation Date', sort: 'asc', name: 'creationDate', filtering: {filterString: '', placeholder: 'Filter by Date'}}
    ];
    public totalItems:number = 0;
    constructor(private jurisdictionService: JurisdictionService){}
    ngOnInit() {
        this.loadAllJurisdictions();
    }
    private loadAllJurisdictions() {
        this.jurisdictionService.getAll().subscribe(jurisdictions => {
            this.data = jurisdictions;
            this.totalItems = jurisdictions.length;
            this.rows = jurisdictions;
        });
    }
    private onNameClick(){

    }
    /*
     * methods for delete modal window
     * */
    public onDeleteClick(row: Jurisdiction){
        this.deleteModal.open(row);
    }

    public removeJurisdiction(row) {
        this.jurisdictionService.delete(row.id).subscribe(
            response => {
                console.log(response)
                this.deleteModal.close();
            },
            error => {
                this.formErrors = [];
                this.formErrors.push(error);
            });
    }
    /*
     * --- methods for delete modal window
     * */
}
