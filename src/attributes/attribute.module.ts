import { Module } from '@nestjs/common';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeEntity } from '@/entities/node.entity';
import { AttributeEntity } from '@/entities/attribute.entity';
import { MetanodeEntity } from '@/entities/metanode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NodeEntity, MetanodeEntity, AttributeEntity]),
  ],
  controllers: [AttributeController],
  providers: [AttributeService],
})
export class AttributeModule {}
