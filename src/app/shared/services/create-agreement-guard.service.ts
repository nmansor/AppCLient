import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { FillAgreementComponent } from 'src/app/agreements/fill-agreement/fill-agreement.component';

@Injectable()
export class CreateAgreementCanDeactivateGuardService implements CanDeactivate<FillAgreementComponent> {
constructor( ) {
}

   canDeactivate(component: FillAgreementComponent): boolean {
       if ( component.myForm.dirty ) {
           return confirm('Are you sure you want to discard your changes?');
       }
       return true;
   }
}