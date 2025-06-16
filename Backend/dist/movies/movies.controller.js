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
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const movies_service_1 = require("./movies.service");
const create_movie_dto_1 = require("./dto/create-movie.dto");
const update_movie_dto_1 = require("./dto/update-movie.dto");
const api_token_guard_1 = require("../auth/api-token.guard");
let MoviesController = class MoviesController {
    moviesService;
    constructor(moviesService) {
        this.moviesService = moviesService;
    }
    create(createMovieDto) {
        return this.moviesService.createMovie(createMovieDto);
    }
    findAll() {
        return this.moviesService.findAllMovies();
    }
    findOne(id) {
        return this.moviesService.findMovieById(id);
    }
    findMovieActors(movieId) {
        return this.moviesService.getMovieActors(movieId);
    }
    update(id, updateMovieDto) {
        return this.moviesService.updateMovie(id, updateMovieDto);
    }
    remove(id) {
        return this.moviesService.removeMovie(id);
    }
    addActors(movieId, actors) {
        return Promise.all(actors.map((actor) => this.moviesService.addActorToMovie(movieId, actor.actor_id, actor.character_name)));
    }
    addSingleActor(movieId, actorId, body = {}) {
        return this.moviesService.addActorToMovie(movieId, actorId, body.character_name);
    }
    removeActor(movieId, actorId) {
        return this.moviesService.removeActorFromMovie(movieId, actorId);
    }
};
exports.MoviesController = MoviesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(api_token_guard_1.ApiTokenGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_movie_dto_1.CreateMovieDto]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/actors'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "findMovieActors", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(api_token_guard_1.ApiTokenGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_movie_dto_1.UpdateMovieDto]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(api_token_guard_1.ApiTokenGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/actors'),
    (0, common_1.UseGuards)(api_token_guard_1.ApiTokenGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "addActors", null);
__decorate([
    (0, common_1.Post)(':movieId/actors/:actorId'),
    (0, common_1.UseGuards)(api_token_guard_1.ApiTokenGuard),
    __param(0, (0, common_1.Param)('movieId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('actorId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "addSingleActor", null);
__decorate([
    (0, common_1.Delete)(':movieId/actors/:actorId'),
    (0, common_1.UseGuards)(api_token_guard_1.ApiTokenGuard),
    __param(0, (0, common_1.Param)('movieId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('actorId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "removeActor", null);
exports.MoviesController = MoviesController = __decorate([
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movies_service_1.MoviesService])
], MoviesController);
//# sourceMappingURL=movies.controller.js.map