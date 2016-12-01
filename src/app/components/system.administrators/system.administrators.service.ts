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
        return this.http.get('/api/admin/' + id).map((response: Response) => response.json());
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

}
