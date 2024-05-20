import { Module } from '@nestjs/common';
import { EdgeController } from './edge.controller';
import { EdgeService } from './edge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeEntity } from '@/entities/node.entity';
import { EdgeEntity } from '@/entities/edge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NodeEntity, EdgeEntity])],
  controllers: [EdgeController],
  providers: [EdgeService],
})
export class EdgeModule {}
