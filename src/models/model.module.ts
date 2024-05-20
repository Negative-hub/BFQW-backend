import { Module } from '@nestjs/common';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from '@/entities/model.entity';
import { UserEntity } from '@/entities/user.entity';
import { MetanodeEntity } from '@/entities/metanode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ModelEntity, UserEntity, MetanodeEntity]),
  ],
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
