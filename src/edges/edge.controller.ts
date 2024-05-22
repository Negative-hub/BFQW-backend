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
  Get,
} from '@nestjs/common';
import { EdgeService } from '@/edges/edge.service';
import { CreateEdgeDto } from '@/edges/dto/CreateEdgeDto';
import { UpdateEdgeDto } from '@/edges/dto/UpdateEdgeDto';

@Controller('/api/edges')
export class EdgeController {
  constructor(private readonly edgeService: EdgeService) {}

  @Post()
  @HttpCode(201)
  async createEdge(@Body() payload: CreateEdgeDto) {
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

  @Get(':id')
  @HttpCode(200)
  async getEdgeById(@Param('id') id: string) {
    try {
      return this.edgeService.getEdgeById({ edgeId: +id });
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
  async updateEdge(@Body() payload: UpdateEdgeDto) {
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
  async deleteEdge(@Param('id') id: string) {
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
