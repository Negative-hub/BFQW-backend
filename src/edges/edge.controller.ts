import {
  Controller,
  HttpCode,
  HttpException,
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
import { ErrorResponse } from '@/types/general';

@Controller('/api/edges')
export class EdgeController {
  constructor(private readonly edgeService: EdgeService) {}

  @Post()
  @HttpCode(201)
  async createEdge(@Body() payload: CreateEdgeDto) {
    try {
      return await this.edgeService.createEdge(payload);
    } catch (e) {
      const exception = e as ErrorResponse;
      throw new HttpException(
        {
          status: exception.status,
          message: exception.message,
        },
        exception.status,
      );
    }
  }

  @Get(':id')
  @HttpCode(200)
  async getEdgeById(@Param('id') id: string) {
    try {
      return await this.edgeService.getEdgeById({ edgeId: +id });
    } catch (e) {
      const exception = e as ErrorResponse;
      throw new HttpException(
        {
          status: exception.status,
          message: exception.message,
        },
        exception.status,
      );
    }
  }

  @Patch(':id')
  @HttpCode(200)
  async updateEdge(@Body() payload: UpdateEdgeDto) {
    try {
      return await this.edgeService.updateEdge(payload);
    } catch (e) {
      const exception = e as ErrorResponse;
      throw new HttpException(
        {
          status: exception.status,
          message: exception.message,
        },
        exception.status,
      );
    }
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteEdge(@Param('id') id: string) {
    try {
      return await this.edgeService.deleteEdge(+id);
    } catch (e) {
      const exception = e as ErrorResponse;
      throw new HttpException(
        {
          status: exception.status,
          message: exception.message,
        },
        exception.status,
      );
    }
  }
}
