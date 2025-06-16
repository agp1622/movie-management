import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ActorsService } from '../actors/actors.service';
import { MovieActor } from '../movieActor/movie-actor.entity';
export declare class MoviesService {
    private readonly moviesRepository;
    private movieActorRepository;
    private actorsService;
    constructor(moviesRepository: Repository<Movie>, movieActorRepository: Repository<MovieActor>, actorsService: ActorsService);
    createMovie(createMovieDto: CreateMovieDto): Promise<Movie>;
    removeMovie(id: number): Promise<void>;
    findMovieById(id: number): Promise<Movie>;
    findAllMovies(limit?: number, offset?: number): Promise<Movie[]>;
    getMovieActors(movieId: number): Promise<MovieActor[]>;
    addActorToMovie(movieId: number, actorId: number, characterName?: string): Promise<Movie>;
    updateMovie(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie>;
    removeActorFromMovie(movieId: number, actorId: number): Promise<void>;
}
