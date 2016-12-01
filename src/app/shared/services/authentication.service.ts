import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) {
      this.loggedIn = !!localStorage.getItem('currentUserProjectConnect');
  }
  private loggedIn = false;

  login(username: string, password: string) {
    return this.http.get('/app/assets/dataJSON_temp/users.json').map((response: Response) => {
      let users = response.json();
      for (let id in users){
         let user = users[id];
         if(user.password === password && user.login === username){
           localStorage.setItem('currentUserProjectConnect', JSON.stringify(user));
             this.loggedIn = true;
         } else {
           throw new Error('User not authenticated');
         }
      }
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUserProjectConnect');
      this.loggedIn = false;
  }
  isLoggedIn(){
      return this.loggedIn;
  }
}
