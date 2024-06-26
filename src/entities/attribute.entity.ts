import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { NodeEntity } from './node.entity';
import { MetanodeEntity } from './metanode.entity';

@Entity('attribute')
export class AttributeEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  label: string;

  @Column({ type: 'int', nullable: true, name: 'node_id' })
  @ManyToOne(() => NodeEntity, (node) => node.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'node_id' })
  node: NodeEntity;

  @Column({ type: 'int', nullable: true, name: 'metanode_id' })
  @ManyToOne(() => MetanodeEntity, (metanode) => metanode.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'metanode_id' })
  metanode: MetanodeEntity;
}
