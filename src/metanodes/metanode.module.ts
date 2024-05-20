import { Module } from '@nestjs/common';
import { MetanodeController } from './metanode.controller';
import { MetanodeService } from './metanode.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from '@/entities/model.entity';
import { NodeEntity } from '@/entities/node.entity';
import { AttributeEntity } from '@/entities/attribute.entity';
import { MetanodeEntity } from '@/entities/metanode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ModelEntity,
      NodeEntity,
      AttributeEntity,
      MetanodeEntity,
    ]),
  ],
  controllers: [MetanodeController],
  providers: [MetanodeService],
})
export class MetanodeModule {}
