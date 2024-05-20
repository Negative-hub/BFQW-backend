import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ModelEntity } from './entities/model.entity';
import { NodeEntity } from './entities/node.entity';
import { EdgeEntity } from './entities/edge.entity';
import { MetanodeEntity } from './entities/metanode.entity';
import { AttributeEntity } from './entities/attribute.entity';
import { UserModule } from '@/users/user.module';
import { NodeModule } from '@/nodes/node.module';
import { MetanodeModule } from '@/metanodes/metanode.module';
import { ModelModule } from '@/models/model.module';
import { AttributeModule } from '@/attributes/attribute.module';
import { EdgeModule } from '@/edges/edge.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'metagraph',
      entities: [
        UserEntity,
        ModelEntity,
        NodeEntity,
        EdgeEntity,
        MetanodeEntity,
        AttributeEntity,
      ],
      synchronize: true,
    }),
    UserModule,
    ModelModule,
    NodeModule,
    EdgeModule,
    MetanodeModule,
    AttributeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
