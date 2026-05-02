import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Game, GameDetail } from '../models/game.model';

interface RawgPlatformWrapper {
  readonly platform: { readonly name: string };
}

interface RawgNamed {
  readonly name: string;
}

interface RawgGame {
  readonly id: number;
  readonly name: string;
  readonly released: string | null;
  readonly rating: number;
  readonly ratings_count: number;
  readonly metacritic: number | null;
  readonly platforms: readonly RawgPlatformWrapper[] | null;
  readonly genres: readonly RawgNamed[];
  readonly background_image: string | null;
}

interface RawgGamesResponse {
  readonly count: number;
  readonly results: readonly RawgGame[];
}

interface RawgGameDetail extends RawgGame {
  readonly description_raw: string | null;
  readonly website: string | null;
  readonly developers: readonly RawgNamed[] | null;
  readonly publishers: readonly RawgNamed[] | null;
  readonly playtime: number;
  readonly esrb_rating: RawgNamed | null;
  readonly tags: readonly RawgNamed[] | null;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.rawgBaseUrl;
  private readonly apiKey = environment.rawgApiKey;

  getTopGames(pageSize = 40): Observable<Game[]> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('page_size', pageSize)
      .set('ordering', '-rating');

    return this.http
      .get<RawgGamesResponse>(`${this.baseUrl}/games`, { params })
      .pipe(map((response) => response.results.map(toGame)));
  }

  getGameById(id: number): Observable<GameDetail> {
    const params = new HttpParams().set('key', this.apiKey);
    return this.http
      .get<RawgGameDetail>(`${this.baseUrl}/games/${id}`, { params })
      .pipe(map(toGameDetail));
  }
}

function toGame(raw: RawgGame): Game {
  return {
    id: raw.id,
    name: raw.name,
    released: raw.released,
    rating: raw.rating,
    ratingsCount: raw.ratings_count,
    metacritic: raw.metacritic,
    platforms: (raw.platforms ?? []).map((p) => p.platform.name),
    genres: raw.genres.map((g) => g.name),
    backgroundImage: raw.background_image,
  };
}

function toGameDetail(raw: RawgGameDetail): GameDetail {
  return {
    ...toGame(raw),
    description: raw.description_raw?.trim() ?? '',
    website: raw.website?.trim() ?? '',
    developers: (raw.developers ?? []).map((d) => d.name),
    publishers: (raw.publishers ?? []).map((p) => p.name),
    playtime: raw.playtime,
    esrbRating: raw.esrb_rating?.name ?? null,
    tags: (raw.tags ?? []).map((t) => t.name),
  };
}
