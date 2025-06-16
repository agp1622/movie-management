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
exports.Rating = void 0;
const typeorm_1 = require("typeorm");
const movie_entity_1 = require("../../movies/entities/movie.entity");
let Rating = class Rating {
    id;
    rating;
    created_at;
    updated_at;
    movie;
};
exports.Rating = Rating;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Rating.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 2, scale: 1 }),
    __metadata("design:type", Number)
], Rating.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Rating.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Rating.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => movie_entity_1.Movie, (movie) => movie.ratings, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'movie_id' }),
    __metadata("design:type", movie_entity_1.Movie)
], Rating.prototype, "movie", void 0);
exports.Rating = Rating = __decorate([
    (0, typeorm_1.Entity)('ratings')
], Rating);
//# sourceMappingURL=ratings.entity.js.map