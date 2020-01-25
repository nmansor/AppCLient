import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';

import { debounceTime, switchMap, distinctUntilChanged, startWith, tap, map, throttleTime, catchError } from 'rxjs/operators';
import { merge, throwError, of as observableOf } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { AppConfig } from '../../config/appConfig';
import { AgreementService } from '../../shared/services/agreement.service';
import { AgreementsListItem } from '../../shared/models/agreements-list-item.model';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-agreements-list',
  templateUrl: './agreements-list.component.html',
  styleUrls: ['./agreements-list.component.css']
})
export class AgreementsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // dataSource: AgreementsListDataSource;
  // dataSource: MatTableDataSource<AgreementsListItem>;
  @Input() dataSource: MatTableDataSource<AgreementsListItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'agreementDate', 'status', 'dateCompleted', 'action'];
  dataLength = 0;
  docPath = '';
  years = [];
  selectedYear = 0;
  selectedMonth = 1;
  status = 'All';
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(private service: AgreementService, private config: AppConfig, private router: Router
    , private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar, public dialog: MatDialog) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.docPath = this.config.get('PathAPI') + 'agreement/ViewDocument/';
  }

  ngOnInit() {
    const year = new Date().getFullYear();
    this.selectedYear = year;
    this.selectedMonth = 1;
    for (let yr = 0; yr <= 10; yr++) {
      this.years.push(year - yr);
    }
    // this.activatedRoute.paramMap.subscribe( (params: ParamMap) => {
    //   this.status = params.get('status');
    //   this.selectedYear = +params.get('year');
    //   this.selectedMonth = +params.get('month');
    // });

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // if (this.paginator.pageSize === undefined) {
    //   this.paginator.pageSize = 10;
    // }
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;

    this.getAgreements();
  }

  onGetAgeements() {
    this.getAgreements();
  }

  getAgreements(): void {
    this.service.getAgreements(this.selectedYear, this.selectedMonth,
      this.status, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize
    )
      .pipe(
        catchError(this.handleError)
      ).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data.list);
        this.dataLength = data.totalRecs;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
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


  onDelete(agreementId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: 'هل أنت متأكد مسح الملف؟'  // 'Do you confirm the deletion of this data?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteAgreement(agreementId)
          .pipe(
            catchError(this.handleError)
          ).subscribe(() => {
            this.snackBar.open('Agreement deleted', '', {
              duration: 3500,
              verticalPosition: 'top'
            });
          });
      }
    });
  }


}
