import {Component, OnInit} from "@angular/core";
import {OfficeService} from "../services/index";
import {Office} from "../../models/index";

@Component({
  selector: 'offices',
  templateUrl: 'offices.template.html'
})
export class OfficesComponent implements OnInit{
  public data: Office[] = [];
  public columns:Array<any> = [
    {title: 'Name', name: 'name', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by Name'}},
    {title: 'State', name: 'state', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by State'}},
    {title: 'Jurisdictions', sort: 'asc', name: 'jurisdictions', },
    {title: 'Creation Date', sort: 'asc', name: 'creationDate', filtering: {filterString: '', placeholder: 'Filter by Date'}}
  ];
  public rows:Array<any> = [];
  public totalItems:number = 0;
  constructor(private officeService: OfficeService){}
  ngOnInit() {
    this.loadAllOffices();
  }
  private loadAllOffices() {
    this.officeService.getAll().subscribe(offices => {
      this.data = offices;
      this.totalItems = offices.length;
      this.rows = offices;
    });
  }
}
