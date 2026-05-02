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
