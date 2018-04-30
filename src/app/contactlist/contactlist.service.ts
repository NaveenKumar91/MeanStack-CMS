import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/add/operator/map';
@Injectable()
export class ContactlistService {
  constructor(private http: Http, private cookies: CookieService) { }
  getContactList(data): Observable<any> {
    //let value = 1
    //let data: any = {};
    //data.age25 = 25;
    let body = JSON.stringify(data);
    let header = new Headers({
      'Content-Type': 'application/json'
    });
    header.append("Accept", 'application/json');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    let options = new RequestOptions({ headers: header });

    return this.http.post(`http://localhost:8000/api/contacts` + token, body, options)
      .map(this.handleResponse).catch(this.handleError);
  }


  addContact(data): Observable<any> {
    let body = JSON.stringify(data);
    let header = new Headers({
      'Content-Type': 'application/json'
    });
    header.append("Accept", 'application/json');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    let options = new RequestOptions({ headers: header });
    return this.http.post(`http://localhost:8000/api/contact` + token, body, options)
      .map(this.handleResponse).catch(this.handleError);
  }
  EditContact(data, id): Observable<any> {

    let body = JSON.stringify(data);
    let header = new Headers({
      'Content-Type': 'application/json'
    });

    header.append("Accept", 'application/json');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    let options = new RequestOptions({ headers: header });
    return this.http.put(`http://localhost:8000/api/contact/${id}` + token, body, options)
      .map(this.handleResponse).catch(this.handleError);
  }
  deleteContact(data): Observable<any> {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.delete(`http://localhost:8000/api/contact/${data}` + token)
      .map(this.handleResponse).catch(this.handleError);
  }
  getContactbyId(data): Observable<any> {
    return this.http.get(`http://localhost:8000/api/contacts/${data}`)
      .map(this.handleResponse).catch(this.handleError);
  }

  handleResponse(response: Response) {
    let body = response.json();
    return body;
  }

  handleError(err: any) {
    return Observable.throw("Error");
  }
}
