import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'games' },
  {
    path: 'games',
    title: 'Game Ranker — Top Games',
    loadComponent: () =>
      import('./features/games/games-page/games-page').then((m) => m.GamesPage),
  },
  { path: '**', redirectTo: 'games' },
];
