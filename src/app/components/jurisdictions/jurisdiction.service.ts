import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Jurisdiction } from './jurisdiction'

@Injectable()
export class JurisdictionService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/app/assets/dataJSON_temp/jurisdictions.json').map((response: Response) => response.json()['jurisdictions'])
    }
    getById(id: number) {
        return this.http.get('/api/jurisdiction/' + id).map((response: Response) => response.json());
    }

    create(jurisdiction: Jurisdiction) {
        return this.http.post('/api/jurisdiction', jurisdiction ).map((response: Response) => response.json());
    }

    update(jurisdiction: Jurisdiction) {
        return this.http.put('/api/jurisdiction/' + jurisdiction.id, jurisdiction).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/jurisdiction/' + id,).map((response: Response) => response.json());
    }
}
