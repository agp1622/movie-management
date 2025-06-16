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
exports.ActorsService = void 0;
const common_1 = require("@nestjs/common");
const actors_entity_1 = require("./actors.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ActorsService = class ActorsService {
    actorsRepository;
    constructor(actorsRepository) {
        this.actorsRepository = actorsRepository;
    }
    async createActor(createActorDto) {
        try {
            const actor = this.actorsRepository.create({
                first_name: createActorDto.first_name,
                last_name: createActorDto.last_name,
            });
            return await this.actorsRepository.save(actor);
        }
        catch (error) {
            console.error('Error creating actor:', error);
            throw new common_1.InternalServerErrorException('Failed to create actor');
        }
    }
    async findActorById(actorId) {
        try {
            const actor = await this.actorsRepository.findOne({
                where: { id: actorId },
                relations: ['movieActors', 'movieActors.movie'],
            });
            if (!actor) {
                throw new common_1.NotFoundException('Actor not found');
            }
            return actor;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Error finding actor:', error);
            throw new common_1.InternalServerErrorException('Failed to find actor');
        }
    }
    async updateActor(id, updateActorDto) {
        try {
            const actor = await this.actorsRepository.findOne({ where: { id: id } });
            if (!actor) {
                throw new common_1.NotFoundException('Actor not found');
            }
            Object.assign(actor, updateActorDto);
            return await this.actorsRepository.save(actor);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Error updating actor:', error);
            throw new common_1.InternalServerErrorException('Failed to update actor');
        }
    }
    async removeActor(actorId) {
        try {
            const actor = await this.actorsRepository.findOne({
                where: { id: actorId },
            });
            if (!actor) {
                throw new common_1.NotFoundException('Actor not found');
            }
            await this.actorsRepository.remove(actor);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Error removing actor:', error);
            throw new common_1.InternalServerErrorException('Failed to delete actor');
        }
    }
    async findAllActors() {
        try {
            return await this.actorsRepository.find({
                relations: ['movieActors', 'movieActors.movie'],
            });
        }
        catch (error) {
            console.error('Error finding all actors:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve actors');
        }
    }
};
exports.ActorsService = ActorsService;
exports.ActorsService = ActorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(actors_entity_1.Actor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ActorsService);
//# sourceMappingURL=actors.service.js.map