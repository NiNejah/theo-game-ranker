export interface Exercise {
  readonly id: number;
  readonly title: string;
  readonly concept: string;
  readonly file: string;
  readonly question: string;
  readonly hints: readonly string[];
  readonly stub: string;
  readonly answer: string;
}

export const EXERCISES: readonly Exercise[] = [
  {
    id: 1,
    title: 'Show a TypeScript value in the HTML',
    concept: 'Interpolation',
    file: 'src/app/features/games/games-page/games-page.html',
    question:
      'The class declares `protected readonly title = \'Top Rated Games\';`. Right now the <h1> shows hardcoded text. Display the value of `title` from the class using interpolation.',
    hints: [
      'Interpolation uses double curly braces: {{ propertyName }}.',
      'Anything between {{ and }} is a TypeScript expression evaluated in the component.',
      'You only need to change the text inside the <h1>.',
    ],
    stub: `<h1 class="games-page__title">Hardcoded title — fix me</h1>`,
    answer: `<h1 class="games-page__title">{{ title }}</h1>`,
  },
  {
    id: 2,
    title: 'Show or hide with @if',
    concept: 'Conditional rendering',
    file: 'src/app/features/games/games-page/games-page.html',
    question:
      'Right now the games grid is always shown — even before games have loaded. Use @if to display a <mat-progress-spinner> while `loading()` is true, and the grid otherwise.',
    hints: [
      'Block syntax: @if (condition) { ... } @else { ... }',
      '`loading` is a signal, so read it by calling it: loading()',
      'You can keep the existing <app-games-grid ... /> exactly as-is — just move it inside the @else block.',
    ],
    stub: `<app-games-grid
  [games]="filteredGames()"
  (gameSelected)="onGameSelected($event)"
/>`,
    answer: `@if (loading()) {
  <mat-progress-spinner mode="indeterminate" diameter="48" />
} @else {
  <app-games-grid
    [games]="filteredGames()"
    (gameSelected)="onGameSelected($event)"
  />
}`,
  },
  {
    id: 3,
    title: 'Loop over an array with @for',
    concept: 'List rendering',
    file: 'src/app/features/games/games-page/games-page.html',
    question:
      'Replace the placeholder paragraph with an unordered list (<ul>) that loops over `highlights()` (the top 3 filtered games) and shows each game name in an <li>.',
    hints: [
      'Block syntax: @for (item of items; track item.id) { ... }',
      'Inside the loop, render each game name with interpolation: {{ game.name }}',
      'The `track` clause helps Angular know which items changed — use a unique field like `game.id`.',
    ],
    stub: `<p class="games-page__highlights-empty">
  No highlights yet — fix me with @for.
</p>`,
    answer: `<ul class="games-page__highlights">
  @for (game of highlights(); track game.id) {
    <li>{{ game.name }}</li>
  }
</ul>`,
  },
  {
    id: 4,
    title: 'Bind a property with [disabled]',
    concept: 'Property binding',
    file: 'src/app/features/games/games-page/games-page.html',
    question:
      'The Refresh button below stays clickable even while games are being fetched. Bind its `[disabled]` attribute so the button is disabled exactly when `loading()` is true.',
    hints: [
      'Property binding syntax: [propertyName]="expression"',
      'The expression is plain TypeScript — call signals as functions: loading()',
      'You only need to add the [disabled]="..." attribute to the existing <button>.',
    ],
    stub: `<button mat-raised-button color="primary" (click)="onRefresh()">
  Refresh
</button>`,
    answer: `<button
  mat-raised-button
  color="primary"
  [disabled]="loading()"
  (click)="onRefresh()"
>
  Refresh
</button>`,
  },
  {
    id: 5,
    title: 'Get data from the RAWG API',
    concept: 'HttpClient + service',
    file: 'src/app/features/games/games-page/games-page.ts',
    question:
      'In the constructor, fetch the games from the API. Call `this.gameService.getTopGames()` — it returns an Observable. When the data arrives, put it into the `games` signal and turn off `loading`. If the request fails, show an error snackbar and still stop the spinner.',
    hints: [
      '`getTopGames()` returns an Observable<Game[]>. Subscribe with .subscribe({ next, error }).',
      'Inside `next`, call this.games.set(games) and this.loading.set(false).',
      'Inside `error`, call this.notifications.showError(\'Failed to load games.\') then this.loading.set(false).',
    ],
    stub: `constructor() {
  // TODO: implement.
}`,
    answer: `constructor() {
  this.loadGames();
}

private loadGames(): void {
  this.loading.set(true);
  this.gameService.getTopGames().subscribe({
    next: (games) => {
      this.games.set(games);
      this.loading.set(false);
    },
    error: () => {
      this.notifications.showError('Failed to load games.');
      this.loading.set(false);
    },
  });
}`,
  },
  {
    id: 6,
    title: 'Wire a click handler to a method',
    concept: 'Event binding',
    file: 'src/app/features/games/games-page/games-page.ts',
    question:
      'Implement `onRefresh()` so that clicking the Refresh button reloads the games. The cleanest approach is to call the same `loadGames()` helper you wrote in Exercise 5.',
    hints: [
      'The template already has (click)="onRefresh()" — you just need to fill in the method body.',
      'If you extracted the fetch logic into a private loadGames() method, onRefresh is a one-liner: this.loadGames();',
    ],
    stub: `protected onRefresh(): void {
  // TODO: implement.
}`,
    answer: `protected onRefresh(): void {
  this.loadGames();
}`,
  },
];
