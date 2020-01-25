import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemLookUp } from '../shared/models/item-lookup.model';
import { LookupService } from '../shared/services/lookup.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {

  statusddl: ItemLookUp[];
  selectedStatus: string;

  constructor(private lookupService: LookupService, private userService: UserService
            , public dialogRef: MatDialogRef<StatusDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onUpdateStatus(): void {
    this.userService.updateUserStatus(this.data.notarizerId, this.data.email, +this.selectedStatus).subscribe( (resp) => {
      alert('status updated');
    });
    this.dialogRef.close();
  }
  ngOnInit() {
    this.lookupService.lookupNames('UsersStatusList').subscribe(data => {
      this.statusddl = data as ItemLookUp[];
    });
  }
}
