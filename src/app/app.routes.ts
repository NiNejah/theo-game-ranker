import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'games' },
  {
    path: 'games',
    title: 'Game Ranker — Top Games',
    loadComponent: () =>
      import('./features/games/games-page/games-page').then((m) => m.GamesPage),
  },
  {
    path: 'games/:id',
    title: 'Game Ranker — Game Detail',
    loadComponent: () =>
      import('./features/games/game-detail/game-detail').then((m) => m.GameDetail),
  },
  { path: '**', redirectTo: 'games' },
];
