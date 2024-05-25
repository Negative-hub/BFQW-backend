import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelEntity } from '@/entities/model.entity';
import { NodeEntity } from '@/entities/node.entity';
import { CreateNodeDto } from '@/nodes/dto/CreateNodeDto';
import { MetanodeEntity } from '@/entities/metanode.entity';
import { UpdateNodeDto } from '@/nodes/dto/UpdateNodeDto';
import { AttributeEntity } from '@/entities/attribute.entity';
import { MetagraphNode } from '@/types/general';
import { GetNodeDto } from '@/nodes/dto/GetNodeDto';
import { UpdatedMetanode, UpdatedNode } from '@/types/general';
import { EdgeEntity } from '@/entities/edge.entity';
import { GetMetanodeDto } from '@/nodes/dto/GetMetanodeDto';
import { errorHandler } from '@/utils/errorHandler';

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(NodeEntity)
    private nodesRepository: Repository<NodeEntity>,
    @InjectRepository(ModelEntity)
    private modelsRepository: Repository<ModelEntity>,
    @InjectRepository(MetanodeEntity)
    private metanodeRepository: Repository<MetanodeEntity>,
    @InjectRepository(AttributeEntity)
    private attributeRepository: Repository<AttributeEntity>,
    @InjectRepository(EdgeEntity)
    private edgeRepository: Repository<EdgeEntity>,
  ) {}

  async getMetanodeById(dto: GetMetanodeDto): Promise<UpdatedMetanode> {
    try {
      const metanode = await this.metanodeRepository
        .createQueryBuilder('metanodes')
        .leftJoinAndSelect('metanodes.nodes', 'nodes')
        .leftJoinAndSelect('metanodes.attributes', 'attributes')
        .where('nodes.id IN (:nodeIds)', { nodeIds: dto.nodeIds })
        .getOne();

      return {
        id: metanode.id,
        label: metanode.label,
        attributeIds: metanode.attributes
          .filter((attr) => attr)
          .map((attr) => attr.id),
        nodeIds: metanode.nodes.map((node) => node.id.toString()),
      };
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async getNode(dto: GetNodeDto): Promise<UpdatedNode> {
    try {
      const node = await this.nodesRepository
        .createQueryBuilder('nodes')
        .leftJoinAndSelect('nodes.metanode', 'metanodes')
        .where('nodes.id = :nodeId', { nodeId: dto.nodeId })
        .getOne();
      const attributes = await this.attributeRepository.findBy({
        node: { id: node.id },
      });

      return {
        id: node.id,
        label: node.label,
        attributeIds: attributes.map((attr) => attr.id),
        metanodeId: node.metanode ? node.metanode.id : null,
      };
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async createNode(dto: CreateNodeDto): Promise<MetagraphNode> {
    try {
      const createdNode = this.nodesRepository.create({ label: dto.label });

      const model = await this.modelsRepository.findOneBy({ id: dto.modelId });
      const savedNode = await this.nodesRepository.save({
        ...createdNode,
        model,
      });

      return {
        id: savedNode.id.toString(),
        label: savedNode.label,
        data: { metanode: 0 },
      };
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async updateNode(dto: UpdateNodeDto): Promise<MetagraphNode> {
    try {
      const node = await this.nodesRepository.findOneBy({ id: dto.id });
      const model = await this.modelsRepository.findOneBy({ id: dto.modelId });
      const metanode = await this.metanodeRepository.findOneBy({
        id: dto.metanodeId,
      });
      await this.nodesRepository.update(
        { id: dto.id },
        { label: dto.label, model, metanode },
      );

      await this.attributeRepository.update({ node }, { node: null });

      const updatedNode = await this.nodesRepository.findOneBy({ id: dto.id });

      await Promise.all(
        dto.attributeIds.map((attr) =>
          this.attributeRepository.update({ id: attr }, { node: updatedNode }),
        ),
      );

      return {
        id: updatedNode.id.toString(),
        label: updatedNode.label,
        data: { metanode: updatedNode.metanode?.label || 0 },
      };
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async deleteNode(id: number): Promise<void> {
    try {
      await this.edgeRepository.delete({ source: { id } });
      await this.edgeRepository.delete({ target: { id } });
      await this.nodesRepository.delete({ id });
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }
}
