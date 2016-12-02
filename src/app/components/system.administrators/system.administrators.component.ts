import {Component, OnInit, ViewChild, Output, EventEmitter} from "@angular/core";
import {SystemAdministratorsService} from  "./system.administrators.service";
import {SystemAdministrator} from "./system.administrator";
import {EditLinkComponent} from './offices/edit-link.component';
import {Router} from "@angular/router";

@Component({
    selector: 'system-administrators',
    templateUrl: 'system.administrators.template.html'
})
export class SystemAdministratorsComponent implements OnInit{
    @ViewChild('deleteModal') public deleteModal;
    @ViewChild('addAdminModal') public addAdminModal;
    @Output() onAddAdminToOffice = new EventEmitter();
    public data: SystemAdministrator[] = [];
    public formErrors: Array<any> = [];
    public rows:Array<any> = [];
    public totalItems:number = 0;
    public selectedAdmin : any;

    constructor(private systemAdministratorsService: SystemAdministratorsService,
                private router: Router){}

    ngOnInit() {
        this.loadAllAdministrators();
    }

    /*
     * Load list of All Administrators
     * */
    private loadAllAdministrators(): void {
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
     * Event handler for delete modal window
     * Process Administrator remove functionality
     * */
    private removeAdministrator(row: SystemAdministrator): void {
        this.systemAdministratorsService.delete(row.id).subscribe(
            response => {
                this.deleteModal.close();
            },
            error => {
                this.formErrors = [error];
            });
    }

    /*
     * Event handler for edit Administrator action
     * Redirect to Administrator Details screen
     * */
    private onEditClick(row: SystemAdministrator): void{
        this.router.navigate(['/administrator', row.id, 'general']);
    }

    /*
    * methods for add admin model
    * */
    private onOpen (row){
        this.addAdminModal.open(row);
    }
    /**
     * methods for add admin modal window
     * */

    private onCreateNewAdmin(){
        this.addAdminModal.open();
    }
    private onNameClick(row: SystemAdministrator){
        console.log('name click');
        console.log(row);
        this.router.navigate(['/administrator', row.id, 'general']);
    }
    private onRowClicked(admin: SystemAdministrator){
        this.selectedAdmin = admin;
    }
    private addAdminToOffice(admin){
        this.data.push(this.selectedAdmin);
        this.rows.push(this.selectedAdmin);
    }
}
