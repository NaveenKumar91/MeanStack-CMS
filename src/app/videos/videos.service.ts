import { Injectable } from '@angular/core';
import { observable } from 'rxjs/symbol/observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import 'rxjs/add/operator/catch';

@Injectable()
export class VideosService {
  constructor(private http: Http) {

  }
  getvideoList(): Observable<any> {

    return this.http.get(`http://localhost:8000/api/videos`)
      .map(this.handleResponse);
  }
  handleResponse(response: Response) {
    let body = response.json();
    return body;
  }

  handleError(err: any) {
    return Observable.throw("Error");
  }
}
