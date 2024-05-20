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
  @PrimaryGeneratedColumn({ type: 'int' })
  @OneToMany(() => NodeEntity, (node) => node.model)
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
