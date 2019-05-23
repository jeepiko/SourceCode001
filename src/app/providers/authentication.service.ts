import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { ApiService } from './api.service';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http, private api: ApiService) { }

  login(username: string, password: string) {
    return this.api.get('S_wkorlogin.php?username="' + username + '"&password="' + password + '"')



      .map((response: Response) => {
        let user = response.json();
        if (user.length != 0) {
          localStorage.setItem('currentUser', user[0].user_id);
          localStorage.setItem('user_id', user[0].user_id);
          localStorage.setItem('user_uname', user[0].user_uname);
          localStorage.setItem('user_pass', user[0].user_pass);
          localStorage.setItem('user_fname', user[0].user_fname);


          return localStorage.getItem('currentUser');
        }
      });
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_uname');
    localStorage.removeItem('user_pass');
    localStorage.removeItem('user_fname');
  }
} 
