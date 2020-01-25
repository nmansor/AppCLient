import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Notarizer } from '../../shared/models/notarizer.model';

import { UserService } from '../../shared/services/user.service';
import { LookupService } from '../../shared/services/lookup.service';
import { ItemLookUp } from '../../shared/models/item-lookup.model';

@Component({
  selector: 'app-update-myprofile',
  templateUrl: './update-myprofile.component.html',
  styleUrls: ['./update-myprofile.component.css']
})
export class UpdateMyProfileComponent implements OnInit {
  NotarizerVM: Notarizer;
  cities: ItemLookUp[];
  courts: ItemLookUp[];
  qualificationDocuments: ItemLookUp[];

  myFile: string[] = [];
  formData = new FormData();
  NotarizerFrm = this.fb.group({
  mobilePhone: [null, Validators.required],
  landPhone: [null],
  address: [null, Validators.required],
  courtRegistrationNumber: [null, Validators.required],
  cityId: [null, Validators.required],
  courtId: [null, Validators.required],
  documentId: [null, Validators.required]
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder, private userService: UserService, private lookupService: LookupService, private ar: ActivatedRoute) {
    this.populateLookup();
  }

  ngOnInit() {
    this.ar.paramMap.subscribe( (params: ParamMap) => {
      const id = +(params.get('id'));
      this.userService.getProfile(id).subscribe( resp => {
        this.NotarizerFrm.patchValue({
          mobilePhone: resp.mobilePhone,
          landPhone: resp.landPhone,
          cityId: resp.cityId,
          courtId: resp.courtId,
          address: resp.address
        });
      });
    });
  }
  onSave(model: FormGroup) {
    this.NotarizerVM = model.value;
    this.userService.update(this.NotarizerVM).subscribe(
             resp => {  alert('product gropu updated'); },
             (error) => {
             //  this.statusMsge = 'Problem with service. Please try again after sometime';
              //   this._toaster.success('Problem with service. Please try again after sometime', 'add product item');
               console.error(error);
               }
         );
  }

  onFileSelected(event) {
     const f = document.querySelector('#file');

     if (typeof (FileReader) !== 'undefined') {
       const reader = new FileReader();

       reader.onload = (e: any) => {
       // this.pdfSrc = e.target.result;
      };

     //  reader.readAsArrayBuffer(f.files[0]);

    //   this.formData.append('files', this.myFile);

      // let nativeElement: HTMLInputElement = this.inputFile.nativeElement;

       this.myFile.push(event.target.files[0]);

       this.userService.uploadFile(this.myFile).subscribe(
          resp => {  alert('file uploaded'); },
          (error) => {
          //  this.statusMsge = 'Problem with service. Please try again after sometime';
           //   this._toaster.success('Problem with service. Please try again after sometime', 'add product item');
            console.error(error);
            }
         );
      }
   }

   populateLookup() {
    this.lookupService.lookupNames('Cities').subscribe(data => {
      this.cities = data as ItemLookUp[];
    },
    (error) => {
      //  this.statusMsge = 'Problem with service. Please try again after sometime';
       //   this._toaster.success('Problem with service. Please try again after sometime', 'add product item');
        console.error(error);
        }
     );
    this.lookupService.lookupNames('Courts').subscribe(data => {
      this.courts = data as ItemLookUp[];
    });
    this.lookupService.lookupNames('QualificationDocuments').subscribe(data => {
      this.qualificationDocuments = data as ItemLookUp[];
    });
  }
  }
