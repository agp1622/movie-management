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
exports.Actor = void 0;
const typeorm_1 = require("typeorm");
const movie_actor_entity_1 = require("../movieActor/movie-actor.entity");
let Actor = class Actor {
    id;
    first_name;
    last_name;
    movieActors;
    created_at;
    updated_at;
};
exports.Actor = Actor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Actor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Actor.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Actor.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => movie_actor_entity_1.MovieActor, (movieActor) => movieActor.actor),
    __metadata("design:type", Array)
], Actor.prototype, "movieActors", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Actor.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Actor.prototype, "updated_at", void 0);
exports.Actor = Actor = __decorate([
    (0, typeorm_1.Entity)('actors')
], Actor);
//# sourceMappingURL=actors.entity.js.map