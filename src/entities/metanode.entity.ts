import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { NodeEntity } from './node.entity';
import { AttributeEntity } from '@/entities/attribute.entity';

@Entity()
export class MetanodeEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  @OneToMany(() => NodeEntity, (node) => node.metanode)
  @OneToMany(() => AttributeEntity, (attr) => attr.node)
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  label: string;
}
