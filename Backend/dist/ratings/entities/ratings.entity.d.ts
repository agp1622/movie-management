import { Movie } from '../../movies/entities/movie.entity';
export declare class Rating {
    id: number;
    rating: number;
    created_at: Date;
    updated_at: Date;
    movie: Movie;
}
