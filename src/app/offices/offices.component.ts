import {Component, OnInit} from "@angular/core";
import {Ng2TableModule } from 'ng2-table/ng2-table';
import {OfficeService} from "../services/index";
import {Office} from "../../models/index";

@Component({
  selector: 'app',
  templateUrl: 'offices.template.html'
})
export class OfficesComponent implements OnInit {
  offices: Office[] = [];
  public rows:Array<any> = [];

  public columns:Array<any> = [
    {title: 'Name', name: 'name'},
    {title: 'State', name: 'state'},
    {title: 'Jurisdictions', name: 'jurisdictions'},
    {title: 'Creation Date', name: 'creationDate'}
  ];
  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  }
  constructor(private officeService: OfficeService){}
  ngOnInit() {
    this.loadAllOffices();
  }
  private loadAllOffices() {
    this.officeService.getAll().subscribe(offices => {
      this.offices = offices;
      this.rows = offices;
    });
  }
}
