import { Component, inject, input, numberAttribute, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { EMPTY, catchError, switchMap, tap } from 'rxjs';

import { GameDetail as GameDetailModel } from '../../../core/models/game.model';
import { GameService } from '../../../core/services/game.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-game-detail',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.scss',
})
export class GameDetail {
  private readonly gameService = inject(GameService);
  private readonly notifications = inject(NotificationService);

  readonly id = input.required<number, string>({ transform: numberAttribute });

  protected readonly game = signal<GameDetailModel | null>(null);
  protected readonly loading = signal(true);

  constructor() {
    toObservable(this.id)
      .pipe(
        tap(() => this.loading.set(true)),
        switchMap((gameId) =>
          this.gameService.getGameById(gameId).pipe(
            catchError(() => {
              this.notifications.showError('Failed to load game details.');
              this.loading.set(false);
              return EMPTY;
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((game) => {
        this.game.set(game);
        this.loading.set(false);
      });
  }
}
