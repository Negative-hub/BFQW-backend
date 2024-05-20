import { Module } from '@nestjs/common';
import { NodeController } from './node.controller';
import { NodeService } from './node.service';
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
  controllers: [NodeController],
  providers: [NodeService],
})
export class NodeModule {}
