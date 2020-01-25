import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  catchError} from 'rxjs/Operators';
import {   throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LookupService } from '../shared/services/lookup.service';
import { LookUpAgreementType } from '../shared/models/lookup-agreement-type.model';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
    documents: LookUpAgreementType[];
    selectedDoc: string;
  constructor(private router: Router, private lookupService: LookupService) {
    this.populateLookup();
  }
  ngOnInit() {
  }

  populateLookup() {
    this.lookupService.lookupAgreementType('AgreementTypes').subscribe(data => {
      this.documents = data as LookUpAgreementType[];
    },
          catchError(this.handleError)
    );
  }

  private handleError( errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error: ' , errorResponse.error.message);
    } else {
         console.error('Server side error: ', errorResponse );
    }
    return  throwError('there is a problem with the service, please try later on');
}
  onDocumentSelect(e): void {
    // const docName = e.target.value;
    const templateName = e.target.value;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['fill-agreement', templateName]);
  }
}
