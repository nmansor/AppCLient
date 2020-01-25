import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseDocumentDataService {

  customerName: string;
  subject: string;
  dateCreated: Date;

  constructor() { }
  }
