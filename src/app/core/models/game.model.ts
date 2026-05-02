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

export interface GameDetail extends Game {
  readonly description: string;
  readonly website: string;
  readonly developers: readonly string[];
  readonly publishers: readonly string[];
  readonly playtime: number;
  readonly esrbRating: string | null;
  readonly tags: readonly string[];
}
