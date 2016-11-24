import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(username: string, password: string) {
    return this.http.get('../data/users.json').map((response: Response) => {
      let users = response.json();
      for (let id in users){
         let user = users[id];
         if(user.password === password && user.login === username){
           localStorage.setItem('currentUser', JSON.stringify(user));
         } else {
           throw new Error('User not authenticated');
         }
      }
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
