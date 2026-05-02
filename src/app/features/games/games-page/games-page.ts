// EXERCISES — open /learn for the questions, /learn/answers for the solutions.
// Each `// EXERCISE N` block is a piece you need to complete.

import { Component, computed, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import { GameService } from '../../../core/services/game.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Game } from '../../../core/models/game.model';
import { GamesGrid } from '../games-grid/games-grid';
import { GamesSearch } from '../games-search/games-search';

@Component({
  selector: 'app-games-page',
  imports: [GamesSearch, GamesGrid, MatProgressSpinnerModule],
  templateUrl: './games-page.html',
  styleUrl: './games-page.scss',
})
export class GamesPage {
  private readonly gameService = inject(GameService);
  private readonly notifications = inject(NotificationService);
  private readonly router = inject(Router);

  // EXERCISE 1 — Signals
  // The template reads loading() to decide whether to show the spinner.
  // Pick the right initial value below so the spinner appears on first paint.
  protected readonly games = signal<Game[]>([]);
  protected readonly loading = signal(false);
  protected readonly searchTerm = signal('');

  // EXERCISE 2 — Computed signal
  // Return games whose `name` includes `searchTerm` (case-insensitive).
  // If `searchTerm` is empty/whitespace, return every game.
  protected readonly filteredGames = computed<Game[]>(() => this.games());

  constructor() {
    // EXERCISE 3 — Fetch + signals + RxJS interop
    // Call this.gameService.getTopGames(); on `next` set both `games` and
    // `loading`; on `error` show a snackbar via this.notifications and stop
    // the spinner. Use takeUntilDestroyed() (from '@angular/core/rxjs-interop')
    // so the subscription cleans up automatically.
  }

  // EXERCISE 4a — Event handler (search)
  // Store the new term in the `searchTerm` signal so the computed re-runs.
  protected onSearchChange(_term: string): void {
    // ...
  }

  // EXERCISE 4b — Event handler (navigation)
  // Navigate to /games/:id using the injected Router.
  protected onGameSelected(_game: Game): void {
    // ...
  }
}
