import { Actor } from './actors.entity';
import { Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
export declare class ActorsService {
    private readonly actorsRepository;
    constructor(actorsRepository: Repository<Actor>);
    createActor(createActorDto: CreateActorDto): Promise<Actor>;
    findActorById(actorId: number): Promise<Actor>;
    updateActor(id: number, updateActorDto: UpdateActorDto): Promise<Actor>;
    removeActor(actorId: number): Promise<void>;
    findAllActors(): Promise<Actor[]>;
}
