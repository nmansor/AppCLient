import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

// import { AgreementsListDataSource } from './agreements-list-datasource';

import {debounceTime, switchMap, distinctUntilChanged, startWith, tap, map, throttleTime, catchError} from 'rxjs/operators';
import { merge, throwError , of as observableOf} from 'rxjs';
import {  HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { AppConfig } from '../../config/appConfig';
import { UserService } from '../../shared/services/user.service';
import { NotarizersListItem } from '../../shared/models/notarizers-list-item.model';
import { StatusList } from '../../shared/models/status-list.model';
@Component({
  selector: 'app-users-list',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  // dataSource: AgreementsListDataSource;
  // dataSource: MatTableDataSource<AgreementsListItem>;
  dataSource: MatTableDataSource<NotarizersListItem>;

  isLoadingResults = true;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'phone', 'status', 'dateApproved', 'issuedStamp', 'action'];
  resultsLength = 0;

  docPath = '';
  years = [];
  selectedYear = 0;
  selectedMonth = 1;
  statusList: StatusList;

  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(private service: UserService, private config: AppConfig, private route: Router, private activeroute: ActivatedRoute) {
    this.docPath = this.config.get('PathAPI') + 'users/';
  }

  ngOnInit() {

    const year = new Date().getFullYear();
    this.selectedYear = year;
    this.selectedMonth = 1;
    for (let yr = 0; yr <= 10; yr++) {
      this.years.push(year - yr);
    }

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    if (this.paginator.pageSize === undefined) {
      this.paginator.pageSize = 10;
    }

    this.updateDashboard();
  }
   updateDashboard() {
            this.service.getDashboard(this.selectedYear, this.selectedMonth).subscribe( (data) => {
            this.statusList = data;
            console.log(this.statusList);
        });
          //  this.getUsers();
   }

  getUsers(status: string = 'All'): void {
    this.service.getAll(status, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize)
    .pipe(
      catchError(this.handleError)
    ).subscribe((data) => {
         this.dataSource = new MatTableDataSource(data.list);
         this.resultsLength = data.totalRecs;
         setTimeout(() => this.dataSource.sort = this.sort);
    }
    );
  }

  onView(id: number) {
    this.route.navigate(['view-profile', id], { relativeTo: this.activeroute});
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

  onYearSelected(event): void {
    this.selectedYear = event.target.value;
  }
  onMonthChange(event): void {
    this.selectedMonth = event.target.value;
    alert(this.selectedMonth);
  }


  onDelete(id: number) {

  }
}
