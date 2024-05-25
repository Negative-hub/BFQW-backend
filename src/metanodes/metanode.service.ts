import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetanodeEntity } from '@/entities/metanode.entity';
import { CreateMetanodeDto } from '@/metanodes/dto/CreateMetanodeDto';
import { AttributeEntity } from '@/entities/attribute.entity';
import { UpdateMetanodeDto } from '@/metanodes/dto/UpdateMetanodeDto';
import { NodeEntity } from '@/entities/node.entity';
import { MetagraphNode } from '@/types/general';
import { errorHandler } from '@/utils/errorHandler';

@Injectable()
export class MetanodeService {
  constructor(
    @InjectRepository(NodeEntity)
    private nodeRepository: Repository<NodeEntity>,
    @InjectRepository(MetanodeEntity)
    private metanodeRepository: Repository<MetanodeEntity>,
    @InjectRepository(AttributeEntity)
    private attributeRepository: Repository<AttributeEntity>,
  ) {}

  async createMetanode(dto: CreateMetanodeDto): Promise<MetagraphNode[]> {
    try {
      const createdMetanode = this.metanodeRepository.create({
        label: dto.label,
      });

      const nodes = await this.nodeRepository
        .createQueryBuilder('nodes')
        .where('nodes.id IN (:nodeIds)', { nodeIds: dto.nodes })
        .getMany();

      const savedMetanode = await this.metanodeRepository.save({
        ...createdMetanode,
        nodes,
      });

      return nodes.map((node) => ({
        id: node.id.toString(),
        label: node.label,
        data: { metanode: savedMetanode.label },
      }));
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async updateMetanode(dto: UpdateMetanodeDto): Promise<MetagraphNode[]> {
    try {
      const metanode = await this.metanodeRepository.findOneBy({ id: dto.id });
      await this.metanodeRepository.update(
        { id: dto.id },
        { label: dto.label },
      );

      await this.nodeRepository.update({ metanode }, { metanode: null });
      await Promise.all(
        dto.nodeIds.map((node) =>
          this.nodeRepository.update(
            { id: node },
            { metanode: { id: dto.id } },
          ),
        ),
      );

      await this.attributeRepository.update({ metanode }, { metanode: null });
      await Promise.all(
        dto.attributeIds.map((attr) =>
          this.attributeRepository.update(
            { id: attr },
            { metanode: { id: dto.id } },
          ),
        ),
      );

      const metagraphNodes = await this.nodeRepository
        .createQueryBuilder('nodes')
        .leftJoinAndSelect('nodes.metanode', 'metanodes')
        .where('nodes.model = :modelId', { modelId: dto.modelId })
        .getMany();

      return metagraphNodes.map((node) => ({
        id: node.id.toString(),
        label: node.label,
        data: { metanode: node.metanode ? node.metanode.label : 0 },
      }));
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async deleteMetanode(id: number): Promise<void> {
    try {
      await this.metanodeRepository.delete({ id });
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }
}
