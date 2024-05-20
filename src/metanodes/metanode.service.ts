import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetanodeEntity } from '@/entities/metanode.entity';
import { CreateMetanodeDto } from '@/metanodes/dto/CreateMetanodeDto';
import { AttributeEntity } from '@/entities/attribute.entity';
import { UpdateMetanodeDto } from '@/metanodes/dto/UpdateMetanodeDto';

@Injectable()
export class MetanodeService {
  constructor(
    @InjectRepository(MetanodeEntity)
    private metanodeRepository: Repository<MetanodeEntity>,
    @InjectRepository(AttributeEntity)
    private attributeRepository: Repository<AttributeEntity>,
  ) {}

  async createMetanode(dto: CreateMetanodeDto): Promise<MetanodeEntity> {
    const createdMetanode = this.metanodeRepository.create({
      label: dto.label,
    });
    const savedMetanode = await this.metanodeRepository.save(createdMetanode);

    const updatedAttributes = dto.attributes.map((attr) => {
      return this.attributeRepository.update(
        { id: attr },
        { metanode: savedMetanode },
      );
    });
    await Promise.all(updatedAttributes);

    return savedMetanode;
  }

  async updateMetanode(dto: UpdateMetanodeDto): Promise<MetanodeEntity> {
    await this.metanodeRepository.update({ id: dto.id }, { label: dto.label });

    const metanode = await this.metanodeRepository.findOneBy({ id: dto.id });

    await this.attributeRepository.update({ metanode }, { metanode: null });
    const updatedAttributes = dto.attributes.map((attr) => {
      return this.attributeRepository.update({ id: attr }, { metanode });
    });
    await Promise.all(updatedAttributes);

    return metanode;
  }

  async deleteMetanode(id: number): Promise<void> {
    await this.metanodeRepository.delete({ id });
  }
}
