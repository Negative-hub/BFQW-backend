import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetanodeEntity } from '@/entities/metanode.entity';
import { AttributeEntity } from '@/entities/attribute.entity';
import { CreateAttributeDto } from '@/attributes/dto/CreateAttributeDto';
import { NodeEntity } from '@/entities/node.entity';
import { UpdateAttributeDto } from '@/attributes/dto/UpdateAttributeDto';
import { AttributeOption } from '@/types/general';
import { errorHandler } from '@/utils/errorHandler';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(NodeEntity)
    private nodeRepository: Repository<NodeEntity>,
    @InjectRepository(MetanodeEntity)
    private metanodeRepository: Repository<MetanodeEntity>,
    @InjectRepository(AttributeEntity)
    private attributeRepository: Repository<AttributeEntity>,
  ) {}

  async createAttribute(dto: CreateAttributeDto): Promise<AttributeOption> {
    try {
      const createdAttribute = this.attributeRepository.create({
        label: dto.label,
      });

      const node = await this.nodeRepository.findOneBy({ id: dto.nodeId });
      const metanode = await this.metanodeRepository.findOneBy({
        id: dto.metanodeId,
      });

      const savedAttribute = await this.attributeRepository.save({
        ...createdAttribute,
        node,
        metanode,
      });

      return {
        id: savedAttribute.id,
        label: savedAttribute.label,
        nodeId: node ? node.id.toString() : null,
        metanodeId: savedAttribute.metanode ? savedAttribute.metanode.id : null,
      };
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async updateAttribute(payload: UpdateAttributeDto): Promise<AttributeEntity> {
    try {
      const node = await this.nodeRepository.findOne({
        where: { id: payload.nodeId },
      });
      const metanode = await this.metanodeRepository.findOne({
        where: { id: payload.metanodeId },
      });

      await this.attributeRepository.update(
        { id: payload.id },
        { label: payload.label, node, metanode },
      );

      return this.attributeRepository.findOne({
        where: { id: payload.id },
      });
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }

  async deleteAttribute(id: number): Promise<void> {
    try {
      await this.attributeRepository.delete({ id });
    } catch (e) {
      return Promise.reject(errorHandler(e));
    }
  }
}
