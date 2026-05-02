import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('fetches a single game detail by id', () => {
    let result: unknown;
    service.getGameById(42).subscribe((game) => (result = game));

    const req = httpMock.expectOne((r) => r.url === `${environment.rawgBaseUrl}/games/42`);
    expect(req.request.method).toBe('GET');

    req.flush({
      id: 42,
      name: 'Portal 2',
      released: '2011-04-19',
      rating: 4.61,
      ratings_count: 5000,
      metacritic: 95,
      platforms: [{ platform: { name: 'PC' } }],
      genres: [{ name: 'Puzzle' }],
      background_image: 'https://example.com/p2.jpg',
      description_raw: '  A puzzle game.  ',
      website: 'https://example.com',
      developers: [{ name: 'Valve' }],
      publishers: [{ name: 'Valve' }],
      playtime: 8,
      esrb_rating: { name: 'Everyone 10+' },
      tags: [{ name: 'Singleplayer' }, { name: 'Co-op' }],
    });

    expect(result).toEqual({
      id: 42,
      name: 'Portal 2',
      released: '2011-04-19',
      rating: 4.61,
      ratingsCount: 5000,
      metacritic: 95,
      platforms: ['PC'],
      genres: ['Puzzle'],
      backgroundImage: 'https://example.com/p2.jpg',
      description: 'A puzzle game.',
      website: 'https://example.com',
      developers: ['Valve'],
      publishers: ['Valve'],
      playtime: 8,
      esrbRating: 'Everyone 10+',
      tags: ['Singleplayer', 'Co-op'],
    });
  });

  it('maps RAWG payload to Game[]', () => {
    let result: unknown;
    service.getTopGames(2).subscribe((games) => (result = games));

    const req = httpMock.expectOne((r) => r.url === `${environment.rawgBaseUrl}/games`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page_size')).toBe('2');
    expect(req.request.params.get('ordering')).toBe('-rating');

    req.flush({
      count: 1,
      results: [
        {
          id: 3498,
          name: 'Grand Theft Auto V',
          released: '2013-09-17',
          rating: 4.47,
          ratings_count: 6800,
          metacritic: 92,
          platforms: [{ platform: { name: 'PC' } }, { platform: { name: 'PlayStation 5' } }],
          genres: [{ name: 'Action' }],
          background_image: 'https://example.com/gta.jpg',
        },
      ],
    });

    expect(result).toEqual([
      {
        id: 3498,
        name: 'Grand Theft Auto V',
        released: '2013-09-17',
        rating: 4.47,
        ratingsCount: 6800,
        metacritic: 92,
        platforms: ['PC', 'PlayStation 5'],
        genres: ['Action'],
        backgroundImage: 'https://example.com/gta.jpg',
      },
    ]);
  });
});
