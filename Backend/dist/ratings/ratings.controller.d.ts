import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
export declare class RatingsController {
    private readonly ratingsService;
    constructor(ratingsService: RatingsService);
    findAll(): Promise<import("./entities/ratings.entity").Rating[]>;
    findOne(id: number): Promise<import("./entities/ratings.entity").Rating>;
    findByMovie(movieId: number): Promise<import("./entities/ratings.entity").Rating[]>;
    create(createRatingDto: CreateRatingDto): Promise<import("./entities/ratings.entity").Rating>;
    update(id: number, updateRatingDto: UpdateRatingDto): Promise<import("./entities/ratings.entity").Rating>;
    remove(id: number): Promise<void>;
}
