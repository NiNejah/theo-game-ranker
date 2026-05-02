import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  protected readonly games = signal<Game[]>([]);
  protected readonly loading = signal(true);
  protected readonly searchTerm = signal('');

  protected readonly filteredGames = computed<Game[]>(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const all = this.games();
    if (!term) {
      return all;
    }
    return all.filter((game) => game.name.toLowerCase().includes(term));
  });

  constructor() {
    this.gameService
      .getTopGames()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (games) => {
          this.games.set(games);
          this.loading.set(false);
        },
        error: () => {
          this.notifications.showError(
            'Failed to load games. Check your RAWG API key in environment.development.ts.',
          );
          this.loading.set(false);
        },
      });
  }

  protected onSearchChange(term: string): void {
    this.searchTerm.set(term);
  }

  protected onGameSelected(game: Game): void {
    this.router.navigate(['/games', game.id]);
  }
}
