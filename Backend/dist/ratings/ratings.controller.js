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
exports.RatingsController = void 0;
const common_1 = require("@nestjs/common");
const ratings_service_1 = require("./ratings.service");
const create_rating_dto_1 = require("./dto/create-rating.dto");
const update_rating_dto_1 = require("./dto/update-rating.dto");
const api_token_guard_1 = require("../auth/api-token.guard");
let RatingsController = class RatingsController {
    ratingsService;
    constructor(ratingsService) {
        this.ratingsService = ratingsService;
    }
    findAll() {
        return this.ratingsService.findAllRatings();
    }
    findOne(id) {
        return this.ratingsService.findRatingById(id);
    }
    findByMovie(movieId) {
        return this.ratingsService.findRatingsByMovie(movieId);
    }
    create(createRatingDto) {
        return this.ratingsService.createRating(createRatingDto);
    }
    update(id, updateRatingDto) {
        return this.ratingsService.updateRating(id, updateRatingDto);
    }
    remove(id) {
        return this.ratingsService.removeRating(id);
    }
};
exports.RatingsController = RatingsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('movie/:movieId'),
    __param(0, (0, common_1.Param)('movieId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "findByMovie", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(api_token_guard_1.ApiTokenGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rating_dto_1.CreateRatingDto]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(api_token_guard_1.ApiTokenGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_rating_dto_1.UpdateRatingDto]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(api_token_guard_1.ApiTokenGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "remove", null);
exports.RatingsController = RatingsController = __decorate([
    (0, common_1.Controller)('ratings'),
    __metadata("design:paramtypes", [ratings_service_1.RatingsService])
], RatingsController);
//# sourceMappingURL=ratings.controller.js.map