import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelEntity } from '@/entities/model.entity';
import { UserEntity } from '@/entities/user.entity';
import { CreateModelDto } from './dto/CreateModelDto';
import { Option } from '@/types/general';
import { MetanodeEntity } from '@/entities/metanode.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(ModelEntity)
    private modelsRepository: Repository<ModelEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(MetanodeEntity)
    private metanodesRepository: Repository<MetanodeEntity>,
  ) {}

  async getMetanodesByModel(modelId: number): Promise<Option[]> {
    const metanodes = await this.metanodesRepository
      .createQueryBuilder('metanodes')
      .leftJoinAndSelect('metanodes.id', 'nodes')
      .leftJoinAndSelect('nodes.model', 'models')
      .where('models.id = :modelId', { modelId })
      .getMany();

    return metanodes.map((metanode) => ({
      id: metanode.id,
      name: metanode.label,
    }));
  }

  async createModel(dto: CreateModelDto): Promise<Option> {
    const user = await this.usersRepository.findOneBy({ id: dto.userId });
    const createdModel = this.modelsRepository.create({ ...dto, user });
    const savedModel = await this.modelsRepository.save(createdModel);

    return { id: savedModel.id, name: savedModel.name };
  }

  async deleteModel(id: number): Promise<void> {
    await this.modelsRepository.delete(id);
  }
}
