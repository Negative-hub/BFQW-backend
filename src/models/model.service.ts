import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelEntity } from '@/entities/model.entity';
import { UserEntity } from '@/entities/user.entity';
import { CreateModelDto } from './dto/CreateModelDto';
import {
  AttributeOption,
  MetagraphEdge,
  MetagraphNode,
  Option,
} from '@/types/general';
import { MetanodeEntity } from '@/entities/metanode.entity';
import { NodeEntity } from '@/entities/node.entity';
import { AttributeEntity } from '@/entities/attribute.entity';
import { EdgeEntity } from '@/entities/edge.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(ModelEntity)
    private modelsRepository: Repository<ModelEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(MetanodeEntity)
    private metanodesRepository: Repository<MetanodeEntity>,
    @InjectRepository(EdgeEntity)
    private edgesRepository: Repository<EdgeEntity>,
    @InjectRepository(NodeEntity)
    private nodesRepository: Repository<NodeEntity>,
    @InjectRepository(AttributeEntity)
    private attributesRepository: Repository<AttributeEntity>,
  ) {}

  async getNodes(modelId: number): Promise<MetagraphNode[]> {
    const nodes = await this.nodesRepository
      .createQueryBuilder('nodes')
      .leftJoinAndSelect('nodes.model', 'models')
      .leftJoinAndSelect('nodes.metanode', 'metanodes')
      .where('models.id = :modelId', { modelId })
      .getMany();

    return nodes.map((node) => ({
      id: node.id.toString(),
      label: node.label,
      data: { metanode: node.metanode?.label || 0 },
    }));
  }

  async getMetanodes(modelId: number): Promise<Option[]> {
    const metanodes = await this.metanodesRepository
      .createQueryBuilder('metanodes')
      .leftJoinAndSelect('metanodes.nodes', 'nodes')
      .leftJoinAndSelect('nodes.model', 'models')
      .where('models.id = :modelId', { modelId })
      .getMany();

    return metanodes.map((metanode) => ({
      id: metanode.id,
      name: metanode.label,
    }));
  }

  async getEdges(modelId: number): Promise<MetagraphEdge[]> {
    const edges = await this.edgesRepository
      .createQueryBuilder('edges')
      .leftJoinAndSelect('edges.source', 'sourceNode')
      .leftJoinAndSelect('edges.target', 'targetNode')
      .leftJoinAndSelect('sourceNode.model', 'models')
      .where('models.id = :modelId', { modelId })
      .getMany();

    return edges.map((edge) => ({
      id: edge.id.toString(),
      label: edge.label,
      source: edge.source.id.toString(),
      target: edge.target.id.toString(),
    }));
  }

  async getAttributes(modelId: number): Promise<AttributeOption[]> {
    const attributes = await this.attributesRepository
      .createQueryBuilder('attributes')
      .leftJoinAndSelect('attributes.node', 'nodes')
      .leftJoinAndSelect('nodes.model', 'models')
      .where('models.id = :modelId', { modelId })
      .getMany();

    return attributes.map((attr) => ({
      id: attr.id,
      label: attr.label,
      nodeId: attr.node ? attr.node.id.toString() : null,
      metanodeId: attr.metanode ? attr.metanode.id : null,
    }));
  }

  async createModel(dto: CreateModelDto): Promise<Option> {
    const user = await this.usersRepository.findOneBy({ id: dto.userId });
    const createdModel = this.modelsRepository.create({ name: dto.name });
    const savedModel = await this.modelsRepository.save({
      ...createdModel,
      user,
    });

    return { id: savedModel.id, name: savedModel.name };
  }

  async deleteModel(id: number): Promise<void> {
    await this.modelsRepository.delete(id);
  }
}
