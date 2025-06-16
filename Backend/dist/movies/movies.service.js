"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const movie_entity_1 = require("./entities/movie.entity");
const actors_service_1 = require("../actors/actors.service");
const movie_actor_entity_1 = require("../movieActor/movie-actor.entity");
let MoviesService = class MoviesService {
    moviesRepository;
    movieActorRepository;
    actorsService;
    constructor(moviesRepository, movieActorRepository, actorsService) {
        this.moviesRepository = moviesRepository;
        this.movieActorRepository = movieActorRepository;
        this.actorsService = actorsService;
    }
    async createMovie(createMovieDto) {
        try {
            const existingMovie = await this.moviesRepository.findOne({
                where: { title: createMovieDto.title },
            });
            if (existingMovie) {
                throw new common_1.ConflictException(`Movie with title "${createMovieDto.title}" already exists`);
            }
            const movie = this.moviesRepository.create({
                title: createMovieDto.title,
                year: createMovieDto.year,
            });
            return await this.moviesRepository.save(movie);
        }
        catch (error) {
            console.error('Error creating movie:', error);
            throw new common_1.InternalServerErrorException('Failed to create movie');
        }
    }
    async removeMovie(id) {
        try {
            const result = await this.moviesRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Movie with id: ${id} not found`);
            }
        }
        catch (error) {
            console.error('Error removing movie:', error);
            throw new common_1.InternalServerErrorException('Failed to delete movie');
        }
    }
    async findMovieById(id) {
        try {
            const movie = await this.moviesRepository.findOne({
                where: { id: id },
                relations: ['movieActors', 'movieActors.actor'],
            });
            if (!movie) {
                throw new common_1.NotFoundException(`Movie with id: ${id} not found`);
            }
            return movie;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Error finding movie by ID:', error);
            throw new common_1.InternalServerErrorException('Failed to find movie');
        }
    }
    async findAllMovies(limit = 20, offset = 0) {
        try {
            return this.moviesRepository.find({
                relations: ['movieActors', 'movieActors.actor'],
                take: limit,
                skip: offset,
                order: { created_at: 'DESC' },
            });
        }
        catch (error) {
            console.error('Error finding all movies:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve movies');
        }
    }
    async getMovieActors(movieId) {
        try {
            const movie = await this.findMovieById(movieId);
            return movie.movieActors;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Error getting movie actors:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve movie actors');
        }
    }
    async addActorToMovie(movieId, actorId, characterName) {
        try {
            const movie = await this.findMovieById(movieId);
            const actor = await this.actorsService.findActorById(actorId);
            const existingMovieActor = await this.movieActorRepository.findOne({
                where: {
                    movie: { id: movieId },
                    actor: { id: actorId },
                },
                relations: ['movie', 'actor'],
            });
            if (existingMovieActor) {
                throw new common_1.ConflictException(`Actor ${actor.first_name} ${actor.last_name} is already in movie ${movie.title}`);
            }
            const movieActor = this.movieActorRepository.create({
                movie,
                actor,
                character_name: characterName,
            });
            await this.movieActorRepository.save(movieActor);
            return this.findMovieById(movieId);
        }
        catch (error) {
            console.error('Error adding actor to movie:', error);
            throw new common_1.InternalServerErrorException('Failed to add actor to movie');
        }
    }
    async updateMovie(id, updateMovieDto) {
        try {
            const movie = await this.moviesRepository.findOne({ where: { id } });
            if (!movie) {
                throw new common_1.NotFoundException(`Movie with id: ${id} not found`);
            }
            Object.assign(movie, updateMovieDto);
            return await this.moviesRepository.save(movie);
        }
        catch (error) {
            console.error('Error updating movie:', error);
            throw new common_1.InternalServerErrorException('Failed to update movie');
        }
    }
    async removeActorFromMovie(movieId, actorId) {
        try {
            const movieActor = await this.movieActorRepository.findOne({
                where: {
                    movie: { id: movieId },
                    actor: { id: actorId },
                },
                relations: ['movie', 'actor'],
            });
            if (!movieActor) {
                throw new common_1.NotFoundException(`Actor with id ${actorId} is not associated with movie ${movieId}`);
            }
            await this.movieActorRepository.remove(movieActor);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Error removing actor from movie:', error);
            throw new common_1.InternalServerErrorException('Failed to remove actor from movie');
        }
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __param(1, (0, typeorm_1.InjectRepository)(movie_actor_entity_1.MovieActor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        actors_service_1.ActorsService])
], MoviesService);
//# sourceMappingURL=movies.service.js.map