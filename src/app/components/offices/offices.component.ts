import {Component, OnInit, ViewChild} from "@angular/core";
import {OfficeService} from "./office.service";
import {Office} from "./office";
import {EditLinkComponent } from './offices/edit-link.component';
import {Router} from "@angular/router";

@Component({
  selector: 'offices',
  templateUrl: 'offices.template.html'
})
export class OfficesComponent implements OnInit{
  @ViewChild('deleteModal') public deleteModal;
  public formErrors: Array<any> = [];
  public data: Office[] = [];
  public config: any ={
    paging: true,
    actions: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  }
  public columns:Array<any> = [
    {title: 'Name', name: 'name', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by Name'}},
    {title: 'State', name: 'state', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by State'}},
    {title: 'Jurisdictions', sort: 'asc', name: 'jurisdictions', },
    {title: 'Creation Date', sort: 'asc', name: 'creationDate', filtering: {filterString: '', placeholder: 'Filter by Date'}}
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
      this.rows = offices;
    });
  }
  public onEditClick(row){
    this.router.navigate(['/office', row.id]);
  }
  public onCreateNewOffice(){
    this.router.navigate(['/office/', '']);
  }
  /*
   * methods for delete modal window
   * */
  public onDeleteClick(row: Office){
    this.deleteModal.open(row);
  }

  public removeOffice(row) {
    this.officeService.delete(row.id).subscribe(
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
