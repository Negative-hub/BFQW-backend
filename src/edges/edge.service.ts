import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NodeEntity } from '@/entities/node.entity';
import { CreateEdgeDto } from '@/edges/dto/CreateEdgeDto';
import { EdgeEntity } from '@/entities/edge.entity';
import { UpdateEdgeDto } from '@/edges/dto/UpdateEdgeDto';

@Injectable()
export class EdgeService {
  constructor(
    @InjectRepository(NodeEntity)
    private nodeRepository: Repository<NodeEntity>,
    @InjectRepository(EdgeEntity)
    private edgeRepository: Repository<EdgeEntity>,
  ) {}

  async createEdge(payload: CreateEdgeDto): Promise<EdgeEntity> {
    const sourceNode = await this.nodeRepository.findOne({
      where: { id: payload.sourceId },
    });
    const targetNode = await this.nodeRepository.findOne({
      where: { id: payload.targetId },
    });

    return this.edgeRepository.create({
      label: payload.label,
      source: sourceNode,
      target: targetNode,
    });
  }

  async updateEdge(payload: UpdateEdgeDto): Promise<EdgeEntity> {
    const sourceNode = await this.nodeRepository.findOne({
      where: { id: payload.sourceId },
    });
    const targetNode = await this.nodeRepository.findOne({
      where: { id: payload.targetId },
    });

    await this.edgeRepository.update(
      { id: payload.id },
      { label: payload.label, source: sourceNode, target: targetNode },
    );

    return this.edgeRepository.findOne({
      where: { id: payload.id },
    });
  }

  async deleteEdge(id: number): Promise<void> {
    await this.edgeRepository.delete({ id });
  }
}
