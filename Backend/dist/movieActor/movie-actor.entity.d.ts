import { Movie } from '../movies/entities/movie.entity';
import { Actor } from '../actors/actors.entity';
export declare class MovieActor {
    id: number;
    character_name: string;
    movie: Movie;
    actor: Actor;
    created_at: Date;
    updated_at: Date;
}
