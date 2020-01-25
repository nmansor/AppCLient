import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';

import { map, tap, catchError } from 'rxjs/Operators';
import { AppConfig } from '../../config/appConfig';
import { PagingListVM } from '../../shared/models/pagination-list-vm.model';
import { PagingModel } from '../models/pagingModel.model';
import { AgreementsListItem } from '../models/agreements-list-item.model';
import { StatusList } from '../models/status-list.model';

// import { JwtHelperService } from @auth0/angular-jwt;


@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  private baseUrl = 'https://localhost:44362/api/Agreement';

  constructor(private http: HttpClient, private config: AppConfig) { }
  private pathAPI =  this.config.get('PathAPI'); // this.config.setting['BaseUrl'];

  getPdfTemplate(docName: string): string {
    return '/assets/templates/' + docName;
  }

  getAgreements(year: number, month: number, status: string, filter: string, sortOrder: string, pageNumber: number, pageSize: number ):
        Observable<PagingListVM<AgreementsListItem>> {
    const params = new HttpParams().set('status', status).set('year', year.toString()).set('month', month.toString())
    .set('pageNumber', pageNumber.toString()).set('pageSize', pageSize.toString());


    return this.http.get<PagingListVM<AgreementsListItem>>(this.baseUrl, { headers: this.headers, params });
  }

  getAgreement(): Observable<AgreementsListItem> {
    const token = JSON.parse(localStorage.getItem('token'));

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<AgreementsListItem>(`${this.pathAPI}agreement`, { headers: this.headers });
  }

  getDashboard(month: number, year: number): Observable<StatusList> {
    const token = JSON.parse(localStorage.getItem('token'));

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`
    });
    const params = new HttpParams().set('year', year.toString()).set('month', month.toString());

    return this.http.get<StatusList>(`${this.pathAPI}agreement/Counts`, { headers: this.headers, params });
  }
  deleteAgreement(agreementId: number): Observable<void> {
    const token = JSON.parse(localStorage.getItem('token'));

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.pathAPI}agreement` + '/' + agreementId , { headers: this.headers });
  }

  viewPdfDocument(id: number) {
    const token = JSON.parse(localStorage.getItem('token'));
    this.headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Access-Control-Allow-Origin': '*'
    });
    //     Authorization: `Bearer ${token}`
    return this.http.get(`${this.pathAPI}agreement/ViewDocument/?=` + id, { headers: this.headers });
  }

  saveAgreement(model: any, doc: ArrayBuffer, action: string): any {
    // const frmData = new FormData();
    // frmData.append('DocModel', model);
    const data = JSON.stringify(model);

    // const data = p; // new HttpParams().set('DocModel', p ).set('DocumentName', documentName);

    // this.headers =  new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': ''application/octet-stream''
    //   });

      // tslint:disable-next-line:max-line-length
     // return this.http.post('https://localhost:44362/api/Agreement/GeneratePdfDoc', doc, {headers: this.headers, params, responseType: 'blob'})
    this.headers =  new HttpHeaders({
  'Content-Type':  'application/json',
  'Access-Control-Allow-Origin': '*'
   });

    if ( action === 'ReviewAgreement') {
      return this.http.post(`${this.pathAPI}agreement/ReViewAgreement`, data, {headers: this.headers, responseType: 'blob'});
    } else {
      return this.http.post(`${this.pathAPI}agreement/SaveAgreement`, data, {headers: this.headers, responseType: 'blob'});
   }
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //   private handleError( errorResponse: HttpErrorResponse) {
  //     if (errorResponse.error instanceof ErrorEvent) {
  //       console.error('Client side error: ' , errorResponse.error.message);
  //     } else {
  //          console.error('Server side error: ', errorResponse );
  //     }
  //     return  throwError('there is a problem with the service, please try later on');
  // }
}
