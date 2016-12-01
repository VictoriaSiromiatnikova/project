import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class StatesService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/app/assets/dataJSON_temp/states.json').map((response: Response) => response.json())
    }
}
