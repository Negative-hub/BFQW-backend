import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelEntity } from '@/entities/model.entity';
import { NodeEntity } from '@/entities/node.entity';
import { CreateNodeDto } from '@/nodes/dto/CreateNodeDto';
import { MetanodeEntity } from '@/entities/metanode.entity';
import { UpdateNodeDto } from '@/nodes/dto/UpdateNodeDto';
import { AttributeEntity } from '@/entities/attribute.entity';

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
  ) {}

  async createNode(dto: CreateNodeDto): Promise<NodeEntity> {
    const model = await this.modelsRepository.findOneBy({ id: dto.modelId });
    const metanode = await this.metanodeRepository.findOneBy({
      id: dto.metanodeId,
    });

    const createdNode = this.nodesRepository.create({
      label: dto.label,
      metanode,
      model,
    });
    const savedNode = await this.nodesRepository.save(createdNode);

    const updatedAttributes = (dto.attributes || []).map((attr) => {
      return this.attributeRepository.update(
        { id: attr.id },
        { node: savedNode },
      );
    });
    await Promise.all(updatedAttributes);

    return savedNode;
  }

  async updateNode(dto: UpdateNodeDto): Promise<NodeEntity> {
    const model = await this.modelsRepository.findOneBy({ id: dto.modelId });
    const metanode = await this.metanodeRepository.findOneBy({
      id: dto.metanodeId,
    });

    await this.nodesRepository.update(
      { id: dto.id },
      {
        label: dto.label,
        metanode,
        model,
      },
    );

    const updatedNode = await this.nodesRepository.findOneBy({ id: dto.id });
    await this.attributeRepository.update(
      { node: updatedNode },
      { node: null },
    );
    const updatedAttributes = (dto.attributes || []).map((attr) => {
      return this.attributeRepository.update(
        { id: attr.id },
        { node: updatedNode },
      );
    });
    await Promise.all(updatedAttributes);

    return updatedNode;
  }

  async deleteNode(id: number): Promise<void> {
    await this.nodesRepository.delete({ id });
  }
}
