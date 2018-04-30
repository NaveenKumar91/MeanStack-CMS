import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Injectable()
export class LoginService {
    constructor(private http: Http) { }

    adduser(data): Observable<any> {
        let body = JSON.stringify(data);
        let header = new Headers({
            'Content-Type': 'application/json'
        });
        header.append("Accept", 'application/json');
        let options = new RequestOptions({ headers: header });
        return this.http.post(`http://localhost:8000/user/signup`, body, options)
            .map(this.handleResponse).catch(this.handleError);
    }
    loginuser(data): Observable<any> {
        let body = JSON.stringify(data);
        let header = new Headers({
            'Content-Type': 'application/json'
        });
        header.append("Accept", 'application/json');
        let options = new RequestOptions({ headers: header });
        return this.http.post(`http://localhost:8000/user/signin`, body, options)
            .map(this.handleResponse).catch(this.handleError);
    }
    // logout() {
        
    // }
    handleResponse(response: Response) {
        let body = response.json();
        return body;
    }

    handleError(err: any) {
        return Observable.throw("Error");
    }
}
