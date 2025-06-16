import { MovieActor } from '../../movieActor/movie-actor.entity';
import { Rating } from '../../ratings/entities/ratings.entity';
export declare class Movie {
    id: number;
    title: string;
    year: number;
    movieActors: MovieActor[];
    ratings: Rating[];
    created_at: Date;
    updated_at: Date;
}
