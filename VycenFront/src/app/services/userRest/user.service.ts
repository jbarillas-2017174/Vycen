import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

  constructor(
    private http: HttpClient
  ) { }

  login(params: {}) {
    return this.http.post(environment.baseUrl + 'user/login', params, { headers: this.httpOptions })
  }

  register(params: {}) {
    return this.http.post(environment.baseUrl + 'user/register', params, { headers: this.httpOptions });
  }

  getUser(id: String) {
    return this.http.get(environment.baseUrl + 'user/getUser/' + id, { headers: this.httpOptions });
  }

  getToken() {
    let globalToken = localStorage.getItem('token');
    let token;
    if (globalToken != undefined) {
      token = globalToken;
    } else {
      token = ''
    }
    return token;
  }

  getIdentity() {
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if (globalIdentity != undefined) {
      identity = JSON.parse(globalIdentity);
    } else {
      identity = ''
    }
    return identity;
  }

}
