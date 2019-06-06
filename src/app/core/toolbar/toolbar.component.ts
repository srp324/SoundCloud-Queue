import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {

  public isLoggedIn = false;

  constructor(public loginDialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    this.loginDialog.open(LoginDialogComponent, {
      data: {
        animal: 'panda'
      }
    })
    .afterClosed()
    .subscribe(response => {
      console.log(response);
    });
  }
}

@Component({
  selector: 'app-login-dialog',
  template: '<ngx-auth-firebaseui [guestEnabled]="true" [providers]="[\'google\']" (onSuccess)="saveUser($event)"></ngx-auth-firebaseui>'
})
export class LoginDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  saveUser($event: any): void {
    this.dialogRef.close($event);
  }

}
