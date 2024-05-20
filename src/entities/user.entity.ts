import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ModelEntity } from './model.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  @OneToMany(() => ModelEntity, (model) => model.user)
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;
}
