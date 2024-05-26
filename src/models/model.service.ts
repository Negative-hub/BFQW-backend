import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Repository } from 'typeorm';
import { ModelEntity } from '@/entities/model.entity';
// import { UserEntity } from '@/entities/user.entity';
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
import { errorHandler } from '@/utils/errorHandler';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(ModelEntity)
    private modelsRepository: Repository<ModelEntity>,
    // @InjectRepository(UserEntity)
    // private usersRepository: Repository<UserEntity>,
    @InjectRepository(MetanodeEntity)
    private metanodesRepository: Repository<MetanodeEntity>,
    @InjectRepository(EdgeEntity)
    private edgesRepository: Repository<EdgeEntity>,
    @InjectRepository(NodeEntity)
    private nodesRepository: Repository<NodeEntity>,
    @InjectRepository(AttributeEntity)
    private attributesRepository: Repository<AttributeEntity>,
  ) {}

  async getModels(): Promise<Option[]> {
    try {
      const models = await this.modelsRepository.find();
      return models.map((model) => ({ id: model.id, name: model.name }));
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async getNodes(modelId: number): Promise<MetagraphNode[]> {
    try {
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
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async getMetanodes(modelId: number): Promise<Option[]> {
    try {
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
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async getEdges(modelId: number): Promise<MetagraphEdge[]> {
    try {
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
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async getAttributes(modelId: number): Promise<AttributeOption[]> {
    try {
      const attributes = await this.attributesRepository
        .createQueryBuilder('attributes')
        .leftJoinAndSelect('attributes.node', 'nodes')
        .leftJoinAndSelect('attributes.metanode', 'metanodes')
        .leftJoinAndSelect('nodes.model', 'models')
        .where('models.id = :modelId', { modelId })
        .getMany();

      return attributes.map((attr) => ({
        id: attr.id,
        label: attr.label,
        nodeId: attr.node ? attr.node.id.toString() : null,
        metanodeId: attr.metanode ? attr.metanode.id : null,
      }));
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async createModel(dto: CreateModelDto): Promise<Option> {
    try {
      const createdModel = this.modelsRepository.create({ name: dto.name });
      const savedModel = await this.modelsRepository.save(createdModel);

      return { id: savedModel.id, name: savedModel.name };
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async deleteModel(id: number): Promise<void> {
    try {
      await this.modelsRepository.delete(id);
    } catch (e) {
      console.log(e, 'error');
      return Promise.reject(errorHandler(e));
    }
  }
}
