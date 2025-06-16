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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieActor = void 0;
const typeorm_1 = require("typeorm");
const movie_entity_1 = require("../movies/entities/movie.entity");
const actors_entity_1 = require("../actors/actors.entity");
let MovieActor = class MovieActor {
    id;
    character_name;
    movie;
    actor;
    created_at;
    updated_at;
};
exports.MovieActor = MovieActor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MovieActor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], MovieActor.prototype, "character_name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => movie_entity_1.Movie, (movie) => movie.movieActors, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'movie_id' }),
    __metadata("design:type", movie_entity_1.Movie)
], MovieActor.prototype, "movie", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => actors_entity_1.Actor, (actor) => actor.movieActors, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'actor_id' }),
    __metadata("design:type", actors_entity_1.Actor)
], MovieActor.prototype, "actor", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MovieActor.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MovieActor.prototype, "updated_at", void 0);
exports.MovieActor = MovieActor = __decorate([
    (0, typeorm_1.Entity)('movie_actors')
], MovieActor);
//# sourceMappingURL=movie-actor.entity.js.map