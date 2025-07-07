
import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {
  private subscriptions = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private overlay: OverlayContainer
  ) { }

  showSuccess(message: string): void {
    const container = this.overlay.getContainerElement();
    container.classList.add('success-snackbar');

    const snackBarRef = this.snackBar.open(message, 'OK', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });

    const sub = snackBarRef.afterDismissed().subscribe(() => {
      container.classList.remove('success-snackbar');
    });
    this.subscriptions.add(sub);
  }

  showError(message: string): void {
    const container = this.overlay.getContainerElement();
    container.classList.add('error-snackbar');

    const snackBarRef = this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });

    const sub = snackBarRef.afterDismissed().subscribe(() => {
      container.classList.remove('error-snackbar');
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}