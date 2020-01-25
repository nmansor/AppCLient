import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

import { ViewPdfDocsService } from "../../shared/services/view-pdf-docs.service";

import { CompanyInitiationModel } from "../shared/models/CompanyInitiation.model";

@Component({
  selector: "app-create-document",
  templateUrl: "./create-document.component.html",
  styleUrls: ["./create-document.component.css"]
})
export class CreateDocumentComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private service: ViewPdfDocsService) {
   
   }

  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    this.myForm = this.fb.group({
    CompanyName: ['', [Validators.required]],
    HourTime: ['', [Validators.required]],
    DayOfTheWeek: ['', [Validators.required]],
    DateCreated: ['', [Validators.required]],
    NotarizerName: ['', [Validators.required]],
    RegisteredCourtName: ['',  [Validators.required]],
    NotarizerRegistrationNumber: ['',  [Validators.required]],
    Partners: this.fb.array(
      [
        this.fb.group({
          PartnerCompanyName: '',
          DeputyName: [''],
          DeputyIDNumber: [''],
        })
      ])
    });
  }

  addItem() {
    const item = this.fb.group({
      PartnerCompanyName:'' ,
      DeputyName: '', 
      DeputyIDNumber: ''
    });

    this.PartnersForms.push(item);
}

  get PartnersForms() {
    return this.myForm.get('Partners') as FormArray;
  }

  removeItem(i: number) {
    // remove a company from the list
    const control = <FormArray>this.myForm.controls['Partners'];
    control.removeAt(i);
  }

  onSave(model: FormGroup) {
    alert("display forms inputs " + model.value);

    this.service.saveDocumentModel(model.value, "Create Company").subscribe((resp) => {
    });

    // this.service.saveDocumentModel(model.value,  "Create Company").subscribe(
    //     response => {
    //       alert("file uploaded");
    //       const blob = new Blob([response.fileContents], { type: "application/octet-stream" });
    //       const url = window.URL.createObjectURL(blob);
    //       window.open(url);

    //       (error) => {
    //          console.error(error);
    //       }
    //     });
  }
  resetForm(form?: FormGroup) {
     if ( form != null) {
        form.reset();
     }
  }
}
