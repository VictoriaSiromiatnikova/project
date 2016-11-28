import {Component, OnInit} from "@angular/core";
import {JurisdictionService} from "../services/index";
import {Jurisdiction} from "../../models/index";

@Component({
    selector: 'jurisdictions',
    templateUrl: 'jurisdictions.template.html'
})
export class JurisdictionsComponent implements OnInit {
    public data: Jurisdiction[] = [];
    public rows:Array<any> = [];
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
}
