import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  showSuccess(message: string): void {
    this.snackBar.openFromComponent(AlertComponent, {
      duration: 2000,
      data: {
        message: message,
        type: 'success'
      },
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['success-snackbar']
    });
  }
  
  showError(message: string): void {
    // The second parameter is the text in the button. 
    // In the third, we send in the css class for the snack bar.
    this.snackBar.openFromComponent(AlertComponent, {
      duration: 5000,
      data: {
        message: message,
        type: 'error'
      },
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['error-snackbar']
    })
  }

  showConfirmDialog(message?: string): any{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {
        // header: 'Confirmation',
        // message: message,
      }
    });
    return dialogRef;
  }

}
