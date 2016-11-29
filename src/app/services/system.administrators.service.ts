import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class SystemAdministratorsService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('../data/system.administrators.json').map((response: Response) => response.json()['systemAdministrators'])
    }
}
