import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { EdgeService } from '@/edges/edge.service';
import { CreateEdgeDto } from '@/edges/dto/CreateEdgeDto';
import { UpdateEdgeDto } from '@/edges/dto/UpdateEdgeDto';
import { EdgeEntity } from '@/entities/edge.entity';

@Controller('/api/edges')
export class EdgeController {
  constructor(private readonly edgeService: EdgeService) {}

  @Post()
  @HttpCode(201)
  async createEdge(@Body() payload: CreateEdgeDto): Promise<EdgeEntity> {
    try {
      return this.edgeService.createEdge(payload);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Возникла непредвиденная ошибка',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  @HttpCode(200)
  async updateEdge(@Body() payload: UpdateEdgeDto): Promise<EdgeEntity> {
    try {
      return this.edgeService.updateEdge(payload);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Возникла непредвиденная ошибка',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteEdge(@Param('id') id: string): Promise<void> {
    try {
      return this.edgeService.deleteEdge(+id);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Возникла непредвиденная ошибка',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
