// EXERCISES — open /learn for the questions, /learn/answers for the solutions.
// HTML exercises live in games-page.html, TypeScript exercises live in this file.

import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import { GameService } from '../../../core/services/game.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Game } from '../../../core/models/game.model';
import { GamesGrid } from '../games-grid/games-grid';
import { GamesSearch } from '../games-search/games-search';

@Component({
  selector: 'app-games-page',
  imports: [GamesSearch, GamesGrid, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './games-page.html',
  styleUrl: './games-page.scss',
})
export class GamesPage {
  private readonly gameService = inject(GameService);
  private readonly notifications = inject(NotificationService);
  private readonly router = inject(Router);

  // Used by Exercise 1 — display this in the <h1> via interpolation.
  protected readonly title = 'Top Rated Games';

  // Reactive state — signals automatically refresh the template when they change.
  protected readonly games = signal<Game[]>([]);
  protected readonly loading = signal(true);
  protected readonly searchTerm = signal('');

  // Filter games by the current search term.
  protected readonly filteredGames = computed<Game[]>(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const all = this.games();
    if (!term) {
      return all;
    }
    return all.filter((game) => game.name.toLowerCase().includes(term));
  });

  // First 3 filtered games — used by Exercise 3 (@for).
  protected readonly highlights = computed<Game[]>(() => this.filteredGames().slice(0, 3));

  constructor() {
    // EXERCISE 5 — Get data from the RAWG API
    // Call this.gameService.getTopGames() and update the `games` and `loading`
    // signals when the response arrives. On error, call
    // this.notifications.showError('Failed to load games.') and stop the spinner.
    // TODO: implement.
  }

  // EXERCISE 6 — Wire the click handler
  // Reload the games list. Tip: extract the fetch logic from Exercise 5 into a
  // private loadGames() method so this becomes a one-liner.
  protected onRefresh(): void {
    // TODO: implement.
  }

  protected onSearchChange(term: string): void {
    this.searchTerm.set(term);
  }

  protected onGameSelected(game: Game): void {
    this.router.navigate(['/games', game.id]);
  }
}
