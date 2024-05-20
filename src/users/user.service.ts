import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelEntity } from '@/entities/model.entity';
import { UserEntity } from '@/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(ModelEntity)
    private modelsRepository: Repository<ModelEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAllModels(userId: number): Promise<ModelEntity[]> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    return this.modelsRepository.findBy({ user });
  }
}
