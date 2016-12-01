import {Component, OnInit, ViewChild, Output, EventEmitter} from "@angular/core";
import {SystemAdministratorsService} from  "./system.administrators.service";
import {SystemAdministrator} from "./system.administrator";
import {EditLinkComponent} from './offices/edit-link.component';
import {Router} from "@angular/router";

@Component({
    selector: 'systemAdministrators',
    templateUrl: 'system.administrators.template.html'
})
export class SystemAdministratorsComponent implements OnInit{
    @ViewChild('deleteModal') public deleteModal;
    @ViewChild('addAdminModal') public addAdminModal;
    @Output() onAddAdminToOffice = new EventEmitter();
    public data: SystemAdministrator[] = [];
    public formErrors: Array<any> = [];
    public config: any ={
        paging: false,
        actions: true,
        editAction: true,
        sorting: {columns: this.columns},
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered']
    }
    public columns:Array<any> = [
        {title: 'Name', name: 'name', sort: 'asc'},
        {title: 'Email', name: 'email', sort: 'asc'},
        {title: 'Phone', sort: 'asc', name: 'phone', }
    ];
    public rows:Array<any> = [];
    public totalItems:number = 0;
    ///Modal Admin
    public configModal: any ={
        paging: false,
        actions: false,
        sorting: false,
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered']
    }
    public columnsModal:Array<any> = [
        {title: 'Email', name: 'email', sort: false, filtering: {filterString: '', placeholder: 'Filter by Name'}},
        {title: 'Name', name: 'name', sort: false}
    ];
    public selectedAdmin : any;

    constructor(private systemAdministratorsService: SystemAdministratorsService,
                private router: Router){}
    ngOnInit() {
        this.loadAllAdministrators();
    }
    private loadAllAdministrators() {
        this.systemAdministratorsService.getAll().subscribe(administrators => {
            administrators = administrators.map((admin: SystemAdministrator) => {
                admin['name'] = admin.firstName + ' ' + admin.lastName;
                return admin;
            });
            this.data = administrators;
            this.rows = administrators;
            this.totalItems = administrators.length;
        });
    }
    /*
    * methods for delete modal window
    * */
    public onDeleteClick(row: SystemAdministrator){
        this.deleteModal.open(row);
    }

    public removeAdministrator(row) {
        this.systemAdministratorsService.delete(row.id).subscribe(
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
    /*
    * methods for add admin model
    * */
    private onOpen (row){
        this.addAdminModal.open(row);
    }
    /**
     * methods for add admin modal window
     * */

    public onCreateNewAdmin(){
        this.addAdminModal.open();
    }
    public onNameClick(row: SystemAdministrator){
        console.log('name click');
        console.log(row);
        this.router.navigate(['/administrator', row.id, 'general']);
    }
    public onEditClick(row: SystemAdministrator){
        alert('delete');
        console.log(row);
    }
    public onRowClicked(admin: SystemAdministrator){
        this.selectedAdmin = admin;
    }
    public addAdminToOffice(admin){
        this.data.push(this.selectedAdmin);
        this.rows.push(this.selectedAdmin);
    }
}
