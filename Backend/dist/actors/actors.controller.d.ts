import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
export declare class ActorsController {
    private readonly actorsService;
    constructor(actorsService: ActorsService);
    findAll(): Promise<import("./actors.entity").Actor[]>;
    findOne(id: number): Promise<import("./actors.entity").Actor>;
    create(createActorDto: CreateActorDto): Promise<import("./actors.entity").Actor>;
    update(id: number, updateActorDto: UpdateActorDto): Promise<import("./actors.entity").Actor>;
    remove(id: number): Promise<void>;
}
