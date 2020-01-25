import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import {  catchError} from 'rxjs/Operators';
import {   throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { BaseDocumentDataService } from '../shared/services/base-document-data.service';

import { LookupService } from '../shared/services/lookup.service';
import { LookUpAgreementType } from '../shared/models/lookup-agreement-type.model';

@Component({
  selector: 'app-create-document-base',
  templateUrl: './create-document-base.component.html',
  styleUrls: ['./create-document-base.component.css']
})
export class CreateDocumentBaseComponent implements OnInit {

  myForm: FormGroup;
  documents: LookUpAgreementType[];
  selectedDoc: string;
  toDay = new Date();
  constructor(private fb: FormBuilder, private baseDocSvc: BaseDocumentDataService
            , private lookupService: LookupService, private router: Router) {
  }

  ngOnInit() {
    this.populateLookup();
    this.createForm();
  }

  populateLookup() {
    this.lookupService.lookupAgreementType('AgreementTypes').subscribe(data => {
      this.documents = data as LookUpAgreementType[];
    },
          catchError(this.handleError)
    );
  }

  createForm() {
    this.myForm = this.fb.group({
    TemplateName: ['', [Validators.required]],
    DateCreated: [this.toDay, [Validators.required]],
    CustomerName: ['', [Validators.required]],
    WithnessName: [''],
    Subject: ['']
    });
  }
  onDocumentSelect(e): void {
    // const docName = e.target.value;
    this.selectedDoc = e.target.value;
    alert(this.selectedDoc)
  }

  onSave(model: FormGroup) {
      // const docName = e.target.value;
      this.baseDocSvc.customerName = 'Nasser';
      this.baseDocSvc.subject = 'test test';
      this.baseDocSvc.dateCreated = new Date();
     
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate(['fill-agreement', this.selectedDoc]);
      // this.router.navigate(['fill-agreement', JSON.stringify(model)]);
  }

  resetForm(model: FormGroup) {
    model.reset();
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
