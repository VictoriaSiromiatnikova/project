import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Office} from "./office";

@Injectable()
export class OfficeService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/app/assets/dataJSON_temp/offices.json').map((response: Response) => response.json()['offices'])
    }
    getById(id: number) {
        return this.http.get('/api/offices/' + id).map((response: Response) => {
            //response.json()
            // return Mock Data TODO: remove when api services will be avaliable
            return {
                "id": 1,
                "name": "Office 1",
                "state": "AZ",
                "type": "meritage",
                "jurisdictions": 5,
                "creationDate": "3/25/2010"
            };
        });
    }

    create(office: Office) {
        return this.http.post('/api/offices', office ).map((response: Response) => response.json());
    }

    update(office: Office) {
        return this.http.put('/api/offices/' + office.id, office).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/offices/' + id,).map((response: Response) => response.json());
    }

    private officeTypes: Array<any> = [
        {value: 'safeBuilt', label: 'SAFEbuilt'},
        {value: 'meritage', label: 'Meritage'}
    ];

    private tableConfig: any ={
        paging: true,
        actions: true,
        sorting: {columns: this.tableColumns},
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered']
    }

    private tableColumns:Array<any> = [
        {title: 'Name', name: 'name', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by Name'}},
        {title: 'State', name: 'state', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by State'}},
        {title: 'Jurisdictions', sort: 'asc', name: 'jurisdictions', },
        {title: 'Creation Date', sort: 'asc', name: 'creationDate', filtering: {filterString: '', placeholder: 'Filter by Date'}}
    ];

    private columnsOfficesForAdmin:Array<any> = [
        {title: 'Name', name: 'name', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by Name'}},
        {title: 'State', name: 'state', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by State'}}
    ];
}
