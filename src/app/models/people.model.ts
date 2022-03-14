export interface PeopleRequest {
  count: number;
  next: string;
  previous: number;
  results: People[];
  error?: {
    code: number;
  };
}

export interface People {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
  id?: string;
}

export interface SwapiError {
  code: number;
  error: { detail: string };
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
}
