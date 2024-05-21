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
import { CreateNodeDto } from '@/nodes/dto/CreateNodeDto';
import { NodeService } from '@/nodes/node.service';
import { UpdateNodeDto } from '@/nodes/dto/UpdateNodeDto';

@Controller('/api/nodes')
export class NodeController {
  constructor(private readonly nodesService: NodeService) {}

  @Post()
  @HttpCode(201)
  async createNode(@Body() payload: CreateNodeDto) {
    try {
      return this.nodesService.createNode(payload);
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
  async getNode(@Param('id') id: string) {
    try {
      return this.nodesService.getNode({ nodeId: +id });
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
  async updateNode(@Body() payload: UpdateNodeDto) {
    try {
      return this.nodesService.updateNode(payload);
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
  async deleteNode(@Param('id') id: string) {
    try {
      return this.nodesService.deleteNode(+id);
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
