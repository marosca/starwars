export interface Film {
  title: string;
  episode_id: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  characters: string[];
  planets: string[];
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface FilmsRequest {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
}
