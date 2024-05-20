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

@Entity()
export class NodeEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  @OneToMany(() => ModelEntity, (model) => model.id)
  @OneToMany(() => AttributeEntity, (attr) => attr.node)
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  label: string;

  @Column({ type: 'int', nullable: true })
  @ManyToOne(() => MetanodeEntity, (metanode) => metanode.id)
  @JoinColumn({ name: 'metanode_id' })
  metanode: MetanodeEntity;

  @Column({ type: 'int', nullable: true })
  @ManyToOne(() => ModelEntity, (model) => model.id)
  @JoinColumn({ name: 'model_id' })
  model: ModelEntity;
}
