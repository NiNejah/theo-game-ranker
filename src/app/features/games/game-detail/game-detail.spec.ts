import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GameDetail } from './game-detail';

describe('GameDetail', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetail],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideNoopAnimations(),
        { provide: MatSnackBar, useValue: { open: vi.fn() } },
      ],
    }).compileComponents();
  });

  it('loads the game by id from the route input', () => {
    const fixture = TestBed.createComponent(GameDetail);
    fixture.componentRef.setInput('id', '7');
    fixture.detectChanges();

    const httpMock = TestBed.inject(HttpTestingController);
    httpMock.expectOne((r) => r.url.endsWith('/games/7')).flush({
      id: 7,
      name: 'Half-Life 2',
      released: '2004-11-16',
      rating: 4.49,
      ratings_count: 4000,
      metacritic: 96,
      platforms: [{ platform: { name: 'PC' } }],
      genres: [{ name: 'Shooter' }],
      background_image: null,
      description_raw: 'A landmark FPS.',
      website: '',
      developers: [{ name: 'Valve' }],
      publishers: [{ name: 'Valve' }],
      playtime: 12,
      esrb_rating: { name: 'Mature' },
      tags: [],
    });

    fixture.detectChanges();
    expect(fixture.componentInstance['game']()?.name).toBe('Half-Life 2');
    expect(fixture.componentInstance['loading']()).toBe(false);
    httpMock.verify();
  });
});
