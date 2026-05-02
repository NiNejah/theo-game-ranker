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
    title: 'Reactive state with signals',
    concept: 'Signals',
    file: 'src/app/features/games/games-page/games-page.ts',
    question:
      'The template reads loading() to decide whether to show the spinner. When the page first opens, no games have been fetched yet — what initial value should `loading` hold so the spinner appears immediately?',
    hints: [
      'signal(initialValue) returns a WritableSignal<T> — the value it starts with is exactly what the first read returns.',
      'Look at the @if (loading()) block in games-page.html.',
    ],
    stub: `protected readonly loading = signal(false);`,
    answer: `protected readonly loading = signal(true);`,
  },
  {
    id: 2,
    title: 'Derive state with computed()',
    concept: 'Computed signals',
    file: 'src/app/features/games/games-page/games-page.ts',
    question:
      'Implement filteredGames so it returns games whose `name` includes the current `searchTerm` (case-insensitive). When the search term is empty or whitespace, return every game. The template binds [games]="filteredGames()" on <app-games-grid>, so this is what the table actually shows.',
    hints: [
      'computed(() => …) re-runs whenever a signal it reads changes — so read both this.games() and this.searchTerm() inside.',
      'Lowercase both sides and use String#includes() for the substring match.',
      'Trim the term before checking emptiness so a value of "   " is treated as empty.',
    ],
    stub: `protected readonly filteredGames = computed<Game[]>(() => this.games());`,
    answer: `protected readonly filteredGames = computed<Game[]>(() => {
  const term = this.searchTerm().toLowerCase().trim();
  const all = this.games();
  if (!term) {
    return all;
  }
  return all.filter((game) => game.name.toLowerCase().includes(term));
});`,
  },
  {
    id: 3,
    title: 'Fetch data and update signals',
    concept: 'HttpClient + RxJS interop',
    file: 'src/app/features/games/games-page/games-page.ts',
    question:
      'In the constructor, call this.gameService.getTopGames() and update the games + loading signals when the response arrives. On error, show a snackbar via this.notifications.showError(...) and stop the spinner. Make sure the subscription is torn down when the component is destroyed.',
    hints: [
      "Add an import: import { takeUntilDestroyed } from '@angular/core/rxjs-interop';",
      'Pipe the observable through takeUntilDestroyed() before .subscribe({ next, error }).',
      'takeUntilDestroyed() with no DestroyRef arg only works inside an injection context — the constructor counts.',
      'WritableSignals expose .set(newValue).',
    ],
    stub: `constructor() {
  // TODO: implement.
}`,
    answer: `constructor() {
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
}`,
  },
  {
    id: 4,
    title: 'Wire user events to state changes',
    concept: 'Event handlers + Router',
    file: 'src/app/features/games/games-page/games-page.ts',
    question:
      'onSearchChange receives the latest text from <app-games-search> — store it in the searchTerm signal so the computed re-runs. onGameSelected receives a Game when a row is clicked — navigate to /games/:id using the injected Router.',
    hints: [
      'WritableSignals expose .set(value).',
      "Router#navigate accepts an array of URL segments: ['/games', id].",
    ],
    stub: `protected onSearchChange(_term: string): void {
  // ...
}

protected onGameSelected(_game: Game): void {
  // ...
}`,
    answer: `protected onSearchChange(term: string): void {
  this.searchTerm.set(term);
}

protected onGameSelected(game: Game): void {
  this.router.navigate(['/games', game.id]);
}`,
  },
];
