import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NodeEntity } from '@/entities/node.entity';
import { CreateEdgeDto } from '@/edges/dto/CreateEdgeDto';
import { EdgeEntity } from '@/entities/edge.entity';
import { UpdateEdgeDto } from '@/edges/dto/UpdateEdgeDto';
import { MetagraphEdge } from '@/types/general';
import { GetNodeDto } from '@/edges/dto/GetNodeDto';
import { errorHandler } from '@/utils/errorHandler';

@Injectable()
export class EdgeService {
  constructor(
    @InjectRepository(NodeEntity)
    private nodeRepository: Repository<NodeEntity>,
    @InjectRepository(EdgeEntity)
    private edgeRepository: Repository<EdgeEntity>,
  ) {}

  async createEdge(dto: CreateEdgeDto): Promise<MetagraphEdge> {
    try {
      const source = await this.nodeRepository.findOneBy({ id: dto.sourceId });
      const target = await this.nodeRepository.findOneBy({ id: dto.targetId });

      const createdEdge = this.edgeRepository.create({ label: dto.label });
      const savedEdge = await this.edgeRepository.save({
        ...createdEdge,
        source,
        target,
      });

      return {
        id: savedEdge.id.toString(),
        label: savedEdge.label,
        source: savedEdge.source.toString(),
        target: savedEdge.target.toString(),
      };
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async getEdgeById(dto: GetNodeDto): Promise<MetagraphEdge> {
    try {
      const edge = await this.edgeRepository
        .createQueryBuilder('edges')
        .leftJoinAndSelect('edges.source', 'source')
        .leftJoinAndSelect('edges.target', 'target')
        .where('edges.id = :edgeId', { edgeId: dto.edgeId })
        .getOne();

      return {
        id: edge.id.toString(),
        label: edge.label,
        source: edge.source.id.toString(),
        target: edge.target.id.toString(),
      };
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async updateEdge(dto: UpdateEdgeDto): Promise<MetagraphEdge> {
    try {
      const source = await this.nodeRepository.findOneBy({ id: dto.sourceId });
      const target = await this.nodeRepository.findOneBy({ id: dto.targetId });

      await this.edgeRepository.update(
        { id: dto.id },
        { label: dto.label, source, target },
      );

      const edge = await this.edgeRepository
        .createQueryBuilder('edges')
        .leftJoinAndSelect('edges.source', 'source')
        .leftJoinAndSelect('edges.target', 'target')
        .where('edges.id = :edgeId', { edgeId: dto.id })
        .getOne();

      return {
        id: edge.id.toString(),
        label: edge.label,
        source: edge.source.id.toString(),
        target: edge.target.id.toString(),
      };
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async deleteEdge(id: number): Promise<void> {
    try {
      await this.edgeRepository.delete({ id });
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }
}
