import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Office} from "../../models/office";

@Injectable()
export class OfficeService {
  constructor(private http: Http) { }

  getAll() {
    return this.http.get('../data/offices.json').map((response: Response) => response.json()['offices'])
  }
  getById(id: number) {
    return this.http.get('/api/offices/' + id).map((response: Response) => response.json());
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

}
