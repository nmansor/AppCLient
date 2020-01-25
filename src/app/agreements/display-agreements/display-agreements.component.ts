import { Component, OnInit, AfterViewInit, OnChanges, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';

import { AgreementsListItem } from '../../shared/models/agreements-list-item.model';
import { AppConfig } from '../../config/appConfig';

@Component({
  selector: 'app-display-agreements',
  templateUrl: './display-agreements.component.html',
  styleUrls: ['./display-agreements.component.css']
})
export class DisplayAgreementsComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() dataSource: [] ;
  @Input() dataLength: number;

  displayedColumns = [ 'title', 'agreementDate', 'status', 'dateCompleted',  'action'];
  dataList: MatTableDataSource<AgreementsListItem> ;
  listLength: number;
  docPath = '';
  years = [];
  selectedYear = 0;
  selectedMonth = 1;
  status = 'All';
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(private config: AppConfig) {
    this.docPath = this.config.get('PathAPI') + 'agreement/ViewDocument/';
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
      this.paginator.pageIndex = 0;
    }
   
  }

  ngOnChanges() {
    this.dataList = new MatTableDataSource<AgreementsListItem>(this.dataSource);
    this.dataList.paginator = this.paginator ;
    this.dataList.sort = this.sort;
    this.listLength = this.dataLength;
      
  }
  ngAfterViewInit() {
   
   }
   onDelete(id: number) {
     alert('onDelete not implemented yet');
   }
}
