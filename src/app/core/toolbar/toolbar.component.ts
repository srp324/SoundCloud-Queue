import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import * as firebase from 'firebase/app';

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

  public user: firebase.User;

  constructor(public loginDialog: MatDialog, public fbService: FirebaseService) {
    window.onload = () => {
      this.isLoggedIn();
    };
  }

  ngOnInit() {}

  isLoggedIn() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.fbService.getQueue(this.user.uid);
      }
    });
  }

  signOut() {
    this.fbService.logout().then(() => {
      this.user = null;
      this.fbService.clearQueue();
    })
    .catch(err => {
      console.log('Error logging out');
    });
  }

  openDialog() {
    this.loginDialog.open(LoginDialogComponent)
    .afterClosed()
    .subscribe(response => {
      this.user = response;
    });
  }
}

@Component({
  selector: 'app-login-dialog',
  // TODO: Upgrade ngx-auth-firebaseui to 2.3.0 in order for messageOnAuthSuccess update (https://github.com/AnthonyNahas/ngx-auth-firebaseui/issues/163)
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
