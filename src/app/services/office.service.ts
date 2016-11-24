import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class OfficeService {
  constructor(private http: Http) { }

  getAll() {
    return this.http.get('../data/offices.json').map((response: Response) => response.json()['offices'])
  }
}
