import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseDocumentDataService } from '../../shared/services/base-document-data.service';

// import { PDFDocumentProxy } from 'ng2-pdf-viewer';
// import { PDFAnnotationData } from 'pdfjs-dist';
import {

  PDFViewerParams,
  PDFPageProxy,
  PDFSource,
  PDFDocumentProxy,
  PDFProgressData,
  PDFPromise,
  PDFAnnotationData
} from 'pdfjs-dist';

import { AgreementService } from '../../shared/services/agreement.service';

import { Input } from '../../shared/models/input.model';

@Component({
  selector: 'app-fill-agreement',
  templateUrl: './fill-agreement.component.html',
  //  template: `<pdf-viewer id='viewer' [src]='pdfSrc' (after-load-complete)='loadComplete($event)'></pdf-viewer>`,
  styleUrls: ['./fill-agreement.component.css'],

  providers: []
})

export class FillAgreementComponent implements OnInit {

  constructor(private service: AgreementService, private fb: FormBuilder
            , private ar: ActivatedRoute, private baseDocSvc: BaseDocumentDataService) {
    // Button events
   //  this.inititatePdfDoc();
  }
  reviewDoc = false;
  page = 1;
  pdfSrc = '';
  pdfSrc2 = '';
  docName = '';
  outline: any[];
  // screen DPI / PDF DPI
  readonly dpiRatio = 96 / 72;

  public myForm: FormGroup;

  public inputList: Input[] = [];
  pdf2: PDFDocumentProxy;

  pdfDoc = null;
  pageNum = 1;      // start on first page
  pageIsRendering = false;  // state of the page
  pageNumIsPending = null;    // if rendering more than one page

   scale = 1.5;
    canvas = document.querySelector('#form-container');
   // ctx = this.canvas.getContext('2d');  // fetch the pdf and put in the canvas

  ngOnInit() {
      alert( this.baseDocSvc.dateCreated + ',  '  + this.baseDocSvc.customerName + ', ' + this.baseDocSvc.subject);
      this.ar.paramMap.subscribe((params: ParamMap) => {
      this.docName = (params.get('docSelected'));
      });
     // const baseDocument = JSON.parse(this.ar.snapshot.params[0]);

     // this.docName = this.ar.snapshot.params['docName'];
      this.docName = this.docName + '.pdf';
     // document.querySelector('#prev-page').addEventListener('click', this.showPrevPage);
     // document.querySelector('#next-page').addEventListener('click', this.showNextPage);
      this.myForm = this.fb.group({
         agreementFormName: [this.docName]
      });
      alert(this.docName);
      this.pdfSrc = this.service.getPdfTemplate(this.docName);
  }


 
  private createInput(annotation: PDFAnnotationData, rect: number[] = null, pgNumber: number) {
    const formControl = new FormControl(annotation.buttonValue || '');

    const input = new Input();
    input.name = annotation.fieldName;
    if (annotation.fieldName === '' || annotation.fieldName.indexOf('undefined') > 0) {
     alert(annotation.fieldName);
    } else {
    // alert(annotation.fieldName + ',  ' + annotation.fieldType  + ', ' + annotation.buttonValue)
    }
    if (annotation.fieldType === 'Tx') {
      input.type = 'text';
     
      input.value = annotation.buttonValue || '';
    }

    // Calculate all the positions and sizes
    if (rect) {
      input.top = rect[1] - (rect[1] - rect[3]);
     
      input.left = rect[0];
      input.height = (rect[1] - rect[3]) * 0.9;
      input.width = (rect[2] - rect[0]);
      input.pgNumber = pgNumber;
    }

  
    this.inputList.push(input);
    return formControl;
  }

  private addInput(annotation: PDFAnnotationData, rect: number[] = null, pgNumber: number): void {
    // add input to page
    this.myForm.addControl(annotation.fieldName, this.createInput(annotation, rect, pgNumber));
  }

  public getInputPosition(input: Input): any {
    return {
      top: `${input.top + ( (input.pgNumber - 1) * 842 * this.dpiRatio) }px`,
      left: `${input.left}px`,
      height: `${input.height}px`,
      width: `${input.width}px`,
    };
  }




  // render the page
       renderPage =  num => {
      this.pageIsRendering = true; // in the process of rendering
    // get the page
      this.pdfDoc.getPage(num).then(page => {

     // console.log(page);  // inspect the page .. has render fn and view port plus ..
    // set scale
      const viewport = page.getViewPort({
      scale: this.scale
      });
     // this.canvas.height = viewport.height;
     // this.canvas.width = viewport.width;

     // const  renderCtx = {  canvasContext: this.ctx,  viewport };
      const  renderCtx = {    viewport };
      page.render(renderCtx).promise.then(() => {
          this.pageIsRendering = false; // done rendering
          if (this.pageNumIsPending !== null) {
            this.renderPage(this.pageNumIsPending);  // what ever the page number is
            this.pageNumIsPending = null;
          }
        });
        // output currtent page
      document.querySelector('#page-count').textContent =  this.pdfDoc.numPages;
      this.renderPage(this.pageNum);
      });
   }


//      // Check for pages rendering
       queueRenderPage = num => {
      if (this.pageIsRendering) {
         this.pageNumIsPending = num;
      } else {
        this.renderPage(num);
      }
    }

//  show Prev page
  //      showPrevPage = () => {
  //   if (this.pageNum <= 1) {
  //       return;
  //   }
  //   this.pageNum--;
  //   this.queueRenderPage(this.pageNum);
  // }


// //  show Next page
       showNextPage = () => {
       if (this.pageNum >= this.pdfDoc.numPages) { return ; }
       this.pageNum++;
       this.queueRenderPage(this.pageNum);
      }


      // tslint:disable-next-line:no-unused-expression
loadComplete(pdf: PDFDocumentProxy): void {

      for (let i = 1; i <= pdf.numPages; i++) {
      
      // track the current page
      let currentPage = null;
      pdf.getPage(i).then(p => {
        currentPage = p;
        // get the annotations of the current page
        return p.getAnnotations();
      }).then(ann => {
        // ugly cast due to missing typescript definitions
        // please contribute to complete @types/pdfjs-dist
        const annotations = (ann as any) as PDFAnnotationData[];

        annotations
          .filter(a => a.subtype === 'Widget') // get the form field annotation only
          .forEach(a => {

            // get the rectangle that represent the single field
            // and resize it according to the current DPI
            const fieldRect = currentPage.getViewport(this.dpiRatio)
              .convertToViewportRectangle(a.rect);

            // add the corresponding input
            this.addInput(a, fieldRect, i);
          });
      });
    }
      this.pdf2 = pdf;

  }
  /**
   * Get pdf information after it's loaded
   * @param pdf
   */
  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.pdf2 = pdf;
    // this.isLoaded = true;
    this.loadOutline();
  }

  /**
   * Get outline
   */
  loadOutline(): void {
      this.pdf2.getOutline().then((outline: any[]) => {
      this.outline = outline;
    });
  }

  revert(): void {

  }

onSave(model: FormGroup): void {
    this.reviewDoc = true;
    let d = new Uint8Array(100000);
    const len = this.pdf2.getMetadata;
    this.pdf2.getData().then(x => {
    d = x.slice(0, x.length);
    let d2 = new ArrayBuffer(x.length);
    d2 = x.buffer;

    // add on the forms input values, the base document data paramters
    const data = Object.assign({}, model.value, { 'dateCreated': this.baseDocSvc.dateCreated,
                                   'customerName': this.baseDocSvc.customerName, 'subject': this.baseDocSvc.subject} );


    this.service.saveAgreement(data, d2, 'ReviewAgreement')
    .subscribe(
      (res) => {
        this.pdfSrc2 = window.URL.createObjectURL(res);
      },

          // Initiate blob object with byte array and MIME type.
          //  return  new Blob([(response.fileContents)], { type: 'application/octet-stream' });

          // Create blobUrl from blob object.
          // const blobUrl: string = window.URL.createObjectURL(blob);

          // Bind trustedUrl to element src.
          // this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);

          // Revoking blobUrl.
          //   window.URL.revokeObjectURL(blobUrl);
        
        (error) => {
          alert('error occured downloading binary pdf document ' + error);
          //  this.statusMsge = 'Problem with service. Please try again after sometime';
          //   this._toaster.success('Problem with service. Please try again after sometime', 'add product item');
          console.error(error);
        });
    });
  }
  
    onAccept(model: FormGroup): void {
      let d = new Uint8Array(100000);
      const len = this.pdf2.getMetadata;
      this.pdf2.getData().then(x => {
      d = x.slice(0, x.length);
      let d2 = new ArrayBuffer(x.length);
      d2 = x.buffer;
  
      this.service.saveAgreement(model.value, d2, 'SaveAgreement')
      .subscribe(
        (res) => {
          this.pdfSrc2 = window.URL.createObjectURL(res);
  
      },
  
            // Initiate blob object with byte array and MIME type.
            //  return  new Blob([(response.fileContents)], { type: 'application/octet-stream' });
  
            // Create blobUrl from blob object.
            // const blobUrl: string = window.URL.createObjectURL(blob);
  
            // Bind trustedUrl to element src.
            // this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
  
            // Revoking blobUrl.
            //   window.URL.revokeObjectURL(blobUrl);
          
          (error) => {
            alert('error occured downloading binary pdf document ' + error);
            //  this.statusMsge = 'Problem with service. Please try again after sometime';
            //   this._toaster.success('Problem with service. Please try again after sometime', 'add product item');
            console.error(error);
          });
      });
  }
}
