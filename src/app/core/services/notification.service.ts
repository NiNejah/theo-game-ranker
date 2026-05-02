import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);
  private readonly defaultDurationMs = 4000;

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: this.defaultDurationMs,
      panelClass: ['snackbar--success'],
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: this.defaultDurationMs,
      panelClass: ['snackbar--error'],
    });
  }
}
