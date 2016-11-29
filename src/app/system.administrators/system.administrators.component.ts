import {Component, OnInit} from "@angular/core";
import {SystemAdministratorsService} from "../services/index";
import {SystemAdministrator} from "../../models/index";
import { EditLinkComponent } from './offices/edit-link.component';
import {Router} from "@angular/router";

@Component({
    selector: 'systemAdministrators',
    templateUrl: 'system.administrators.template.html'
})
export class SystemAdministratorsComponent implements OnInit{
    public data: SystemAdministrator[] = [];
    public config: any ={
        paging: false,
        sorting: {columns: this.columns},
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered']
    }
    public columns:Array<any> = [
        {title: 'Name', name: 'name', sort: 'asc'},
        {title: 'Email', name: 'email', sort: 'asc'},
        {title: 'Phone', sort: 'asc', name: 'phone', },
        {title: '', sort: false, name: 'delete', className: 'action'},
        {title: '', sort: false, name: 'edit', className: 'action'}
    ];
    public rows:Array<any> = [];
    public totalItems:number = 0;
    constructor(private systemAdministratorsService: SystemAdministratorsService,
                private router: Router){}
    ngOnInit() {
        this.loadAllAdministrators();
    }
    private loadAllAdministrators() {
        this.systemAdministratorsService.getAll().subscribe(administrators => {
            this.data = administrators;
            this.totalItems = administrators.length;
            this.rows = this.extendRowsWithAction(administrators);
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
        alert('delete');
        console.log(row);
    }
    public onCreateNewAdmin(){

    }
}
