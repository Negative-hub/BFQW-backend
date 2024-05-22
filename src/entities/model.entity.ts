import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { NodeEntity } from './node.entity';

@Entity()
export class ModelEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  @OneToMany(() => NodeEntity, (node) => node.model)
  @JoinColumn({ name: 'id', referencedColumnName: 'model_id' })
  nodes?: NodeEntity[];

  @Column({ type: 'varchar', length: 255 })
  name: string;

  // TODO
  // @Column({ type: 'int', name: 'user_id' })
  // @ManyToOne(() => UserEntity, (user) => user.id)
  // @JoinColumn({ name: 'user_id' })
  // user: UserEntity;
}
