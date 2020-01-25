import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';

import { UserService } from '../../shared/services/user.service';
import { AppConfig } from '../../config/appConfig';
import { NotarizerProfileVM } from '../../shared/models/NotarizerProfileVM.model';
import { StatusDialogComponent } from '../../status-dialog/status-dialog.component';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  docPath = '';
profile: NotarizerProfileVM;
  constructor(private userService: UserService, private ar: ActivatedRoute
            , private config: AppConfig, public dialog: MatDialog) { }

  ngOnInit() {
   //  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.docPath = this.config.get('PathAPI') + 'users/ViewDocument/';
    this.ar.paramMap.subscribe( (params: ParamMap) => {
    const id = +(params.get('id'));
    // const notarizerId = params.
    this.userService.getProfile(id).subscribe( resp => {
          this.profile = resp;
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '400px',
      data: {notarizerId: this.profile.notarizerId, email: this.profile.email}

    });

    dialogRef.afterClosed().subscribe(result => {
      const hold  = result;
    });
  }

  onDelete(id: number) {
   alert('delete is not implemented');
  }
}
