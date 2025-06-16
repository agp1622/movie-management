import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    create(createMovieDto: CreateMovieDto): Promise<import("./entities/movie.entity").Movie>;
    findAll(): Promise<import("./entities/movie.entity").Movie[]>;
    findOne(id: number): Promise<import("./entities/movie.entity").Movie>;
    findMovieActors(movieId: number): Promise<import("../movieActor/movie-actor.entity").MovieActor[]>;
    update(id: number, updateMovieDto: UpdateMovieDto): Promise<import("./entities/movie.entity").Movie>;
    remove(id: number): Promise<void>;
    addActors(movieId: number, actors: Array<{
        actor_id: number;
        character_name?: string;
    }>): Promise<import("./entities/movie.entity").Movie[]>;
    addSingleActor(movieId: number, actorId: number, body?: {
        character_name?: string;
    }): Promise<import("./entities/movie.entity").Movie>;
    removeActor(movieId: number, actorId: number): Promise<void>;
}
