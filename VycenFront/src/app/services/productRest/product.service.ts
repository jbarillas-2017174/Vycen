import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../userRest/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })

  constructor(
    private userRest: UserService,
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get(environment.baseUrl + 'product/getProducts', { headers: this.httpOptions });
  }
}
