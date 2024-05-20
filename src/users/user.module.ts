import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from '@/entities/model.entity';
import { UserEntity } from '@/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModelEntity, UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
