import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { NodeEntity } from './node.entity';

@Entity()
export class EdgeEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  label: string;

  @Column({ type: 'int' })
  @ManyToOne(() => NodeEntity, (node) => node.id)
  @JoinColumn({ name: 'source_id' })
  source: NodeEntity;

  @Column({ type: 'int' })
  @ManyToOne(() => NodeEntity, (node) => node.id)
  @JoinColumn({ name: 'target_id' })
  target: NodeEntity;
}
