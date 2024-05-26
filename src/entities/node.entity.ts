import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ModelEntity } from './model.entity';
import { MetanodeEntity } from '@/entities/metanode.entity';
import { AttributeEntity } from '@/entities/attribute.entity';

@Entity('node')
export class NodeEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  @OneToMany(() => AttributeEntity, (attr) => attr.node, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  attributes: AttributeEntity[];

  @Column({ type: 'varchar', length: 255, nullable: false })
  label: string;

  @Column({ type: 'int', name: 'model_id' })
  @ManyToOne(() => ModelEntity, (model) => model.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'model_id' })
  model: ModelEntity;

  @Column({ type: 'int', nullable: true, name: 'metanode_id' })
  @ManyToOne(() => MetanodeEntity, (metanode) => metanode.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'metanode_id' })
  metanode: MetanodeEntity | null;
}
