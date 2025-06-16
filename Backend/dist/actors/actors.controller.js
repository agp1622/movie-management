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
exports.ActorsController = void 0;
const common_1 = require("@nestjs/common");
const actors_service_1 = require("./actors.service");
const create_actor_dto_1 = require("./dto/create-actor.dto");
const update_actor_dto_1 = require("./dto/update-actor.dto");
const api_token_guard_1 = require("../auth/api-token.guard");
let ActorsController = class ActorsController {
    actorsService;
    constructor(actorsService) {
        this.actorsService = actorsService;
    }
    findAll() {
        return this.actorsService.findAllActors();
    }
    findOne(id) {
        return this.actorsService.findActorById(id);
    }
    create(createActorDto) {
        return this.actorsService.createActor(createActorDto);
    }
    update(id, updateActorDto) {
        return this.actorsService.updateActor(id, updateActorDto);
    }
    remove(id) {
        return this.actorsService.removeActor(id);
    }
};
exports.ActorsController = ActorsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ActorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ActorsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(api_token_guard_1.ApiTokenGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_actor_dto_1.CreateActorDto]),
    __metadata("design:returntype", void 0)
], ActorsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(api_token_guard_1.ApiTokenGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_actor_dto_1.UpdateActorDto]),
    __metadata("design:returntype", void 0)
], ActorsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(api_token_guard_1.ApiTokenGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ActorsController.prototype, "remove", null);
exports.ActorsController = ActorsController = __decorate([
    (0, common_1.Controller)('actors'),
    __metadata("design:paramtypes", [actors_service_1.ActorsService])
], ActorsController);
//# sourceMappingURL=actors.controller.js.map