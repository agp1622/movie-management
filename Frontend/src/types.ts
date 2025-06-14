export interface Movie {
  id: number;
  title: string;
  year: number;
  movieActors?: MovieActor[];
  ratings?: Rating[];
}

export interface Actor {
  id: number;
  first_name: string;
  last_name: string;
  movieActors?: MovieActor[];
}

export interface MovieActor {
  id: number;
  character_name?: string;
  actor?: Actor;
  movie?: Movie;
}

export interface Rating {
  id: number;
  rating: number;
  movieId: number;
}

export interface CreateMovieData {
  title: string;
  year: number;
}

export interface CreateActorData {
  first_name: string;
  last_name: string;
}

export interface CreateRatingData {
  movieId: number;
  rating: number;
}