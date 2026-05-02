import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GamesPage } from './games-page';

describe('GamesPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideNoopAnimations(),
        { provide: MatSnackBar, useValue: { open: vi.fn() } },
      ],
    }).compileComponents();
  });

  it('creates the page', () => {
    const fixture = TestBed.createComponent(GamesPage);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
