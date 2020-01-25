import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { UserRegistrationVM } from '../../shared/models/UserRegistrationVM.model';
import { ItemLookUp } from '../../shared/models/item-lookup.model';
import { LookupService } from 'src/app/shared/services/lookup.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  cities: ItemLookUp[];

  registerForm = this.fb.group({
    firstName: [null, Validators.required],
    fatherName: [null, Validators.required],
    familyName: [null, Validators.required],
    email: [null, Validators.required],
    mobilePhone: [null, Validators.required],
    // mobilePhone: [null, Validators.compose([
    //   Validators.required, Validators.minLength(7), Validators.maxLength(10)])
    // ],
    // address: [null, Validators.required],
    // cityId: [null, Validators.required],
    password: [null, Validators.required],
    confirmPassword: [null, Validators.required],
  });


  user: UserRegistrationVM;
  constructor(private fb: FormBuilder, private lookupService: LookupService, private userService: UserService, private router: Router) {
    this.populateLookup();
  }

  populateLookup() {
    this.lookupService.lookupNames('Cities').subscribe(data => {
      this.cities = data as ItemLookUp[];
    });
  }

  onSave(model: FormGroup) {
    this.user = model.value;
    this.userService.register(this.user).subscribe(
             resp => { this.router.navigate(['/login']); },
             (error) => {
             //  this.statusMsge = 'Problem with service. Please try again after sometime';
              //   this._toaster.success('Problem with service. Please try again after sometime', 'add product item');
               console.error(error);
               }
         );
  }
}
