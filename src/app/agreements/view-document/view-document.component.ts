import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AgreementService } from '../../shared/services/agreement.service';


@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.css']
})
export class ViewDocumentComponent implements OnInit {
  constructor(private service: AgreementService, private ar: ActivatedRoute ) {
}

  ngOnInit() {
      this.ar.paramMap.subscribe( (params: ParamMap) => {
        const id = +(params.get('id'));
        alert('in view-document ngOnInit, document id ' + id);
        if (id > 0) {
              this.service.viewPdfDocument(id).subscribe();
        }
      });
  }

  onViewDocument = function(id: number) {
    this.service.viewPdfDocument(id).subscribe();
  };

}
