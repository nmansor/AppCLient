import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';

import { map, catchError} from 'rxjs/Operators';
// import { JwtHelperService } from @auth0/angular-jwt;
import { PagingListVM } from '../models/pagination-list-vm.model';
import { UserRegistrationVM } from '../models/UserRegistrationVM.model';
import { NotarizersListItem } from '../models/notarizers-list-item.model';
import { Notarizer } from '../models/notarizer.model';
import { StatusList } from '../models/status-list.model';
@Injectable({
    providedIn: 'root'
})
export class UserService {

   headers =  new HttpHeaders({
    'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
  });
    constructor(private http: HttpClient) { }

    register(user: UserRegistrationVM) {
          console.log('in user service register');

          const data = JSON.stringify(
          { firstName: user.firstName
            , fatherName: user.fatherName
            , familyName: user.familyName
            , email: user.email
            , mobilePhone: user.mobilePhone
            , password: user.password
            , confirmPassword: user.confirmPassword
            }
       );
          return this.http.post<any>('https://localhost:44362/api/users/register', data, {headers: this.headers})
          .pipe( map(resp => {
            // login successful if there's a jwt token in the response
            if (resp && resp.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(resp));
                // this.currentUserSubject.next(user);
            }
            console.log(user);
            return user;
        }
        ,
          catchError(this.handleError)));
    }

    login(username: string, password: string): any {
      return this.http.post<any>(`https://localhost:44362/api/users/Login`, { username, password }, {headers: this.headers});
  }

  logout() {
    return this.http.get<any>(`https://localhost:44362/api/users/Logout`);
  }

  getAll(status: string, filter: string, sortOrder: string
      , pageNumber: number, pageSize: number): Observable<PagingListVM<NotarizersListItem>> {
      const token = JSON.parse(localStorage.getItem('token'));

      this.headers =  new HttpHeaders({
        'Content-Type':  'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`
      });
      const params = new HttpParams().set('status', status).set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

      return this.http.get<PagingListVM<NotarizersListItem>>('https://localhost:44362/api/users', { headers: this.headers, params });
    }

    getDashboard( year: number, month: number): Observable<StatusList> {
      const token = JSON.parse(localStorage.getItem('token'));

      this.headers =  new HttpHeaders({
        'Content-Type':  'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`
      });
      const params = new HttpParams().set('year', year.toString()).set('month', month.toString());
      return this.http.get<StatusList>('https://localhost:44362/api/users/Dashboard', { headers: this.headers, params });
    }

  getProfile(id: number) {
    return this.http.get<any>('https://localhost:44362/api/users/GetProfile/' + id, {headers: this.headers});
  }
  updateUserStatus(notarizerId: number, notarizerEmail: string, statusId: number) {
    // const params = new HttpParams().set('notarizerId', notarizerId.toString()).set('notarizerEmail', notarizerEmail)
    // .set('statusId', statusId);
    const params = { notarizerId,  notarizerEmail,  statusId };

    const data = JSON.stringify(params);
    return this.http.put<any>('https://localhost:44362/api/users/UpdateStatus/' , data, {headers: this.headers });
  }
  update(user: Notarizer) {
      const data = JSON.stringify(user);

      return this.http.put<any>('https://localhost:44362/api/users/update', data, {headers: this.headers})
      .pipe( map(resp => {
        // login successful if there's a jwt token in the response
        if (resp && resp.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(resp));
            // this.currentUserSubject.next(user);
        }
        console.log(user);
        return user;
    }
    ,
      catchError(this.handleError)));
}

    uploadFile(files: string[]) {
      const frmData = new FormData();
      if (files) {
        this.headers =  new HttpHeaders({
          Accept: 'application/json'
       });

      // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < files.length; i++) {
          frmData.append('files', files[i]);
        }
        frmData.append('notarizerId',  '16');
        frmData.append('docName', 'University Certificate');

        return this.http.post('https://localhost:44362/api/users/UploadQualificationDoc', frmData, {headers: this.headers});
      }
    }

    private handleError( errorResponse: HttpErrorResponse) {
      if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client side error: ' , errorResponse.error.message);
      } else {
           console.error('Server side error: ', errorResponse );
      }
      return  throwError('there is a problem with the service, please try later on');
  }
}
