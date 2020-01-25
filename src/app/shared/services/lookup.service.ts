import { Injectable } from '@angular/core';

import {HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {Observable} from 'rxjs';

import {map,  filter} from 'rxjs/Operators';

import { ItemLookUp } from '../models/item-lookup.model';
import { LookUpAgreementType } from '../models/lookup-agreement-type.model';
@Injectable()
export class LookupService {

  readonly lookupServiceUrl: string = 'https://localhost:44362/api/LookUpTables/';

   httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
    })
 };

  constructor(private http: HttpClient) {}

    lookupNames(tableName: string): Observable<ItemLookUp[]> {
    return  this.http.get<ItemLookUp[]>(this.lookupServiceUrl + tableName, this.httpOptions);
   }

   lookupAgreementType(tableName: string): Observable<LookUpAgreementType[]> {
    return  this.http.get<LookUpAgreementType[]>(this.lookupServiceUrl + tableName, this.httpOptions);
   }
}
