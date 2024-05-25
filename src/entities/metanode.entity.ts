import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { NodeEntity } from './node.entity';
import { AttributeEntity } from '@/entities/attribute.entity';

@Entity('metanode')
export class MetanodeEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  @OneToMany(() => NodeEntity, (node) => node.metanode)
  @JoinColumn({ name: 'id' })
  nodes: NodeEntity[];
  @OneToMany(() => AttributeEntity, (attr) => attr.metanode)
  @JoinColumn({ name: 'id' })
  attributes: AttributeEntity[];

  @Column({ type: 'varchar', length: 255, nullable: false })
  label: string;
}
