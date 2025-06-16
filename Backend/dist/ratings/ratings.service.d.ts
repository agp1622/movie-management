import { Repository } from 'typeorm';
import { Rating } from './entities/ratings.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Movie } from '../movies/entities/movie.entity';
export declare class RatingsService {
    private ratingsRepository;
    private moviesRepository;
    constructor(ratingsRepository: Repository<Rating>, moviesRepository: Repository<Movie>);
    createRating(createRatingDto: CreateRatingDto): Promise<Rating>;
    findAllRatings(): Promise<Rating[]>;
    findRatingById(id: number): Promise<Rating>;
    findRatingsByMovie(movieId: number): Promise<Rating[]>;
    updateRating(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating>;
    removeRating(id: number): Promise<void>;
}
