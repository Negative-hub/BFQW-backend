import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ModelEntity } from '@/entities/model.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // TODO
  // @OneToMany(() => ModelEntity, (model) => model.user)
  // @JoinColumn({ name: 'id' })
  // models: ModelEntity[];

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;
}
