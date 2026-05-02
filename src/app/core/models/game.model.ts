export interface Game {
  readonly id: number;
  readonly name: string;
  readonly released: string | null;
  readonly rating: number;
  readonly ratingsCount: number;
  readonly metacritic: number | null;
  readonly platforms: readonly string[];
  readonly genres: readonly string[];
  readonly backgroundImage: string | null;
}
