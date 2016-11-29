import {Component, OnInit} from "@angular/core";
import {OfficeService} from "../services/index";
import {Office} from "../../models/index";
import { EditLinkComponent } from './offices/edit-link.component';
import {Router} from "@angular/router";

@Component({
  selector: 'offices',
  templateUrl: 'offices.template.html'
})
export class OfficesComponent implements OnInit{
  public data: Office[] = [];
  public config: any ={
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  }
  public columns:Array<any> = [
    {title: 'Name', name: 'name', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by Name'}},
    {title: 'State', name: 'state', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by State'}},
    {title: 'Jurisdictions', sort: 'asc', name: 'jurisdictions', },
    {title: 'Creation Date', sort: 'asc', name: 'creationDate', filtering: {filterString: '', placeholder: 'Filter by Date'}},
    {title: '', sort: false, name: 'delete', className: 'action'},
    {title: '', sort: false, name: 'edit', className: 'action'}
  ];
  public rows:Array<any> = [];
  public totalItems:number = 0;
  constructor(private officeService: OfficeService,
              private router: Router){}
  ngOnInit() {
    this.loadAllOffices();
  }
  private loadAllOffices() {
    this.officeService.getAll().subscribe(offices => {
      this.data = offices;
      this.totalItems = offices.length;
      this.rows = this.extendRowsWithAction(offices);
    });
  }
  private extendRowsWithAction(rows: Array<any>):Array<any>{
    for(let row of rows){
      row['delete'] = `<div class="delete">Delete</div>`;
      row['edit'] = `<div class="edit">Edit</div>`;
    }
    return rows;
  }
  public onDelete(row){
    alert('delete');
    console.log(row);
  }
  public onEdit(row){
    this.router.navigate(['/office', row.id]);
  }
  public onCreateNewOffice(){
    this.router.navigate(['/office', 'new']);
  }
}
