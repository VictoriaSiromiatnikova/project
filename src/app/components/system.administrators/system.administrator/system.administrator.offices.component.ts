import {Component, OnInit, ViewChild} from "@angular/core";
import {SystemAdministratorsService} from  "../system.administrators.service";
import {SystemAdministrator} from "../system.administrator";
import {Router, ActivatedRoute} from "@angular/router";
import {OfficeService} from "../../offices/office.service";
import {Office} from "../../offices/office";

@Component({
    selector: 'systemAdministratorOffices',
    templateUrl: 'system.administrator.offices.template.html'
})
export class SystemAdministratorOfficesComponent implements OnInit{
    @ViewChild('deleteModal') public deleteModal;
    public formErrors: Array<any> = [];
    public data: Office[] = [];
    public config: any ={
        paging: false,
        actions: true,
        sorting: {columns: this.columns},
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered']
    }
    public columns:Array<any> = [
        {title: 'Name', name: 'name', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by Name'}},
        {title: 'State', name: 'state', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by State'}}
    ];
    public rows:Array<any> = [];
    public totalItems:number = 0;
    private admin: SystemAdministrator = new SystemAdministrator();

    constructor(private systemAdministratorsService: SystemAdministratorsService,
                private route: ActivatedRoute,
                private router: Router,
                private officeService: OfficeService){}
    ngOnInit() {
        let adminId = this.route.parent.snapshot.params['id'];

        if(adminId){
            this.systemAdministratorsService.getById(adminId).subscribe(
                (admin: SystemAdministrator) => {
                    this.admin = admin;
                },
                error => {
                    /*Mock data*/
                    this.admin ={
                        "id": 1,
                        "firstName": "Bob",
                        "lastName": "Smith",
                        "phone": "303-784-9834",
                        "email": "email@email.com",
                        "state": "CA"
                    }
                });
        }
        this.loadAllOffices();
    }
    private loadAllOffices() {
        this.officeService.getAll().subscribe(offices => {
            //cut Mock Data
            offices = offices.slice(1, 5);
            this.data = offices;
            this.totalItems = offices.length;
            this.rows = offices;
        });
    }
    /*
     * methods for delete modal window
     * */
    public onDeleteClick(row: Office){
        this.deleteModal.open(row);
    }

    public removeOfficeFromAdmin(row) {
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
