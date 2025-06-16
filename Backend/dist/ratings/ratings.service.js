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
exports.RatingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ratings_entity_1 = require("./entities/ratings.entity");
const movie_entity_1 = require("../movies/entities/movie.entity");
let RatingsService = class RatingsService {
    ratingsRepository;
    moviesRepository;
    constructor(ratingsRepository, moviesRepository) {
        this.ratingsRepository = ratingsRepository;
        this.moviesRepository = moviesRepository;
    }
    async createRating(createRatingDto) {
        try {
            const movie = await this.moviesRepository.findOne({
                where: { id: createRatingDto.movieId }
            });
            if (!movie) {
                throw new common_1.NotFoundException(`Movie with ID ${createRatingDto.movieId} not found`);
            }
            const rating = this.ratingsRepository.create({
                rating: createRatingDto.rating,
                movie: movie
            });
            return await this.ratingsRepository.save(rating);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Error creating rating:', error);
            throw new common_1.InternalServerErrorException('Failed to create rating');
        }
    }
    async findAllRatings() {
        try {
            return await this.ratingsRepository.find({
                relations: ['movie'],
                order: { created_at: 'DESC' },
            });
        }
        catch (error) {
            console.error('Error finding all ratings:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve ratings');
        }
    }
    async findRatingById(id) {
        try {
            const rating = await this.ratingsRepository.findOne({
                where: { id },
                relations: ['movie'],
            });
            if (!rating) {
                throw new common_1.NotFoundException(`Rating with ID ${id} not found`);
            }
            return rating;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Error finding rating by ID:', error);
            throw new common_1.InternalServerErrorException('Failed to find rating');
        }
    }
    async findRatingsByMovie(movieId) {
        try {
            return await this.ratingsRepository.find({
                where: { movie: { id: movieId } },
                relations: ['movie'],
                order: { created_at: 'DESC' },
            });
        }
        catch (error) {
            console.error('Error finding ratings by movie:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve movie ratings');
        }
    }
    async updateRating(id, updateRatingDto) {
        try {
            const rating = await this.ratingsRepository.findOne({ where: { id } });
            if (!rating) {
                throw new common_1.NotFoundException(`Rating with ID ${id} not found`);
            }
            Object.assign(rating, updateRatingDto);
            return await this.ratingsRepository.save(rating);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Error updating rating:', error);
            throw new common_1.InternalServerErrorException('Failed to update rating');
        }
    }
    async removeRating(id) {
        try {
            const result = await this.ratingsRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Rating with ID ${id} not found`);
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Error removing rating:', error);
            throw new common_1.InternalServerErrorException('Failed to delete rating');
        }
    }
};
exports.RatingsService = RatingsService;
exports.RatingsService = RatingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ratings_entity_1.Rating)),
    __param(1, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RatingsService);
//# sourceMappingURL=ratings.service.js.map