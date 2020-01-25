import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from "@angular/common/http";

import {  Observable, throwError } from "rxjs";

import { map, catchError} from "rxjs/Operators";
import { PDFData } from "../models/pdf-param.model";

import { CompanyInitiationModel } from "../../agreements/shared/models/CompanyInitiation.model";

@Injectable({
  providedIn: "root"
})
export class ViewPdfDocsService {

  private baseUrl =  'https://localhost:44398/api/Agreement/';


  headers =  new HttpHeaders({
    "Content-Type":  "application/json",
        "Access-Control-Allow-Origin": "*",
  });

  constructor( private http: HttpClient) { }

  getPdfDocs(docName: string): string {
    return "/assets/templates/" + docName;
  }

  uploadFile(model: any, doc: ArrayBuffer, documentName: string): any {
    // const frmData = new FormData();
    // frmData.append("DocModel", model);
    const p = JSON.stringify(model);
    const params = new HttpParams().set("DocModel", p ).set("DocumentName", documentName);
    if (doc) {
      this.headers =  new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "'application/octet-stream'"
    });
      return this.http.post("https://localhost:44362/api/Agreement/GeneratePdfDoc", doc, {headers: this.headers, params: params, responseType: 'blob'})
    
    }
  }

  saveDocumentModel(model: CompanyInitiationModel,  documentName: string): any {
    // const frmData = new FormData();
    // frmData.append("DocModel", model);
    const p = JSON.stringify(model);
    return this.http.post("https://localhost:44362/api/Agreement/SaveDocumentModel", p, {headers: this.headers});
  }

  // saveDocumentModel(item: any, documentName: string): Observable<any> {
  //   const body = JSON.stringify(item);
  //   return  this.http.post(this.baseUrl + "SaveDocumentModel", body, {headers: this.headers});
  // }
}
