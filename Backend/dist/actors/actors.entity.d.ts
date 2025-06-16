import { MovieActor } from '../movieActor/movie-actor.entity';
export declare class Actor {
    id: number;
    first_name: string;
    last_name: string;
    movieActors: MovieActor[];
    created_at: Date;
    updated_at: Date;
}
