import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
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
        provideNoopAnimations(),
        { provide: MatSnackBar, useValue: { open: vi.fn() } },
      ],
    }).compileComponents();
  });

  it('loads games into the signal on success', () => {
    const fixture = TestBed.createComponent(GamesPage);
    const httpMock = TestBed.inject(HttpTestingController);

    httpMock.expectOne((r) => r.url.endsWith('/games')).flush({
      count: 1,
      results: [
        {
          id: 1,
          name: 'Halo',
          released: '2001-11-15',
          rating: 4.5,
          ratings_count: 1000,
          metacritic: 95,
          platforms: [{ platform: { name: 'Xbox' } }],
          genres: [{ name: 'Shooter' }],
          background_image: null,
        },
      ],
    });

    fixture.detectChanges();
    expect(fixture.componentInstance['games']().length).toBe(1);
    expect(fixture.componentInstance['loading']()).toBe(false);
    httpMock.verify();
  });
});
