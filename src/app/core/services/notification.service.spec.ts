import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBarOpen: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    snackBarOpen = vi.fn();
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: { open: snackBarOpen } }],
    });
    service = TestBed.inject(NotificationService);
  });

  it('opens a snackbar with success styling', () => {
    service.showSuccess('Saved');
    expect(snackBarOpen).toHaveBeenCalledWith('Saved', 'Dismiss', expect.objectContaining({
      panelClass: ['snackbar--success'],
    }));
  });

  it('opens a snackbar with error styling', () => {
    service.showError('Boom');
    expect(snackBarOpen).toHaveBeenCalledWith('Boom', 'Dismiss', expect.objectContaining({
      panelClass: ['snackbar--error'],
    }));
  });
});
