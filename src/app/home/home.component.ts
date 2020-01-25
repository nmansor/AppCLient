import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { NotarizersListItem } from '../shared/models/notarizers-list-item.model';
import { AgreementService, } from '../shared/services/agreement.service';

import { StatusList } from '../shared/models/status-list.model';
import { Subject } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';
import { merge, throwError } from 'rxjs';
import {  HttpErrorResponse } from '@angular/common/http';

import { MatTableDataSource } from '@angular/material';

import { AgreementsListItem } from '../shared/models/agreements-list-item.model';


@Component({
     templateUrl: 'home.component.html',
     styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    agreementsList: AgreementsListItem[];
    statusList: StatusList;
    years = [];
    selectedYear = 0;
    selectedMonth = 1;
    months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    color = 'green';

    public destroyed = new Subject<any>();

    constructor(private service: AgreementService, private router: Router, private ar: ActivatedRoute) { }

    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        const year = new Date().getFullYear();
        this.selectedYear = year;
        this.selectedMonth = 1;
        for (let yr = 0; yr <= 10; yr++) {
          this.years.push(year - yr);
        }
        this.updateDashboar();
    }

    onGetAgeements() {
        this.updateDashboar();
    }

    updateDashboar(): void {
        this.service.getDashboard(this.selectedMonth, this.selectedYear).pipe(first()).subscribe(data => {
        this.statusList = data ;
        this.getAgreements('Completed');
     });
    }

    onYearSelected(event): void {
        this.selectedYear = event.target.value;
        alert(this.selectedYear)
    }

    onMonthChange(event): void {
        this.selectedMonth = event.target.value;
    }

    getAgreements(status: string) {
      const year = this.selectedYear;
      const month = this.selectedMonth;
     // this.router.navigate(['/home/agreements/:status/:year/:month', {status, year, month}]);
      this.service.getAgreements(this.selectedMonth, this.selectedYear, status, '', '', 1 , 10 ).pipe(first()).subscribe(data => {
        this.agreementsList = data.list;
      });
    }
    onDelete(agreementId: number) {

      this.service.deleteAgreement( agreementId)
      .pipe(
        catchError(this.handleError)
      ).subscribe((data) => {
          alert('Agreement deleted');
      }
      );
    }

    onAddAgeement() {
      this.router.navigateByUrl('/create-base-document');
    }
    private handleError(errorResponse: HttpErrorResponse) {
      if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client side error: ', errorResponse.error.message);
      } else {
        console.error('Server side error: ', errorResponse);
        alert(errorResponse);
      }
      return throwError('there is a problem with the service, please try later on');
    }
}
