import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {SystemAdministrator} from "./system.administrator";

@Injectable()
export class SystemAdministratorsService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/app/assets/dataJSON_temp/system.administrators.json')
            .map((response: Response) => response.json()['systemAdministrators']);
    }
    getById(id: number) {
        return this.http.get('/api/admin/' + id).map((response: Response) => {
            //response.json()
            // return Mock Data TODO: remove when api services will be avaliable
            return {
                "id": 1,
                "firstName": "Bob",
                "lastName": "Smith",
                "phone": "303-784-9834",
                "email": "email@email.com",
                "state": "CA"
            };
        });
    }

    create(admin: SystemAdministrator) {
        return this.http.post('/api/admin', admin ).map((response: Response) => response.json());
    }

    update(admin: SystemAdministrator) {
        return this.http.put('/api/admin/' + admin.id, admin).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/admin/' + id,).map((response: Response) => response.json());
    }
    public configAdminsTable: any ={
        paging: false,
        actions: true,
        sorting: {columns: this.columnsAdminsTable},
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered']
    }
    public columnsAdminsTable:Array<any> = [
        {title: 'Name', name: 'name', sort: 'asc'},
        {title: 'Email', name: 'email', sort: 'asc'},
        {title: 'Phone', sort: 'asc', name: 'phone', }
    ];
    public configAdminsTableModal: any ={
        paging: false,
        actions: false,
        sorting: false,
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered']
    }
    public columnsAdminsTableModal:Array<any> = [
        {title: 'Email', name: 'email', sort: false, filtering: {filterString: '', placeholder: 'Filter by Name'}},
        {title: 'Name', name: 'name', sort: false}
    ];
    public columnsAdminsOfficesTableModal:Array<any> = [
        {title: 'Email', name: 'email', sort: false, filtering: {filterString: '', placeholder: 'Filter by Name'}},
        {title: 'Name', name: 'name', sort: false}
    ];

}
