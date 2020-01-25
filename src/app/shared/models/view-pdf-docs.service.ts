import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewPdfDocsService {

  constructor() { }

  getPdfDocs(): string {
    return "/assets/templates/طلب _انسحاب _من _ شركة.pdf";
  }
}
