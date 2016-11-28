import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class JurisdictionService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('../data/jurisdictions.json').map((response: Response) => response.json()['jurisdictions'])
    }
}
