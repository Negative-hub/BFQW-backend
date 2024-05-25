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
  Query,
} from '@nestjs/common';
import { CreateNodeDto } from '@/nodes/dto/CreateNodeDto';
import { NodeService } from '@/nodes/node.service';
import { UpdateNodeDto } from '@/nodes/dto/UpdateNodeDto';
import { GetMetanodeDto } from '@/nodes/dto/GetMetanodeDto';
import { ErrorResponse } from '@/types/general';

@Controller('/api/nodes')
export class NodeController {
  constructor(private readonly nodesService: NodeService) {}

  @Get('/metanode')
  @HttpCode(200)
  async getMetanodeById(@Query() params: GetMetanodeDto) {
    try {
      return await this.nodesService.getMetanodeById({
        nodeIds: params.nodeIds,
      });
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

  @Get('/:id')
  @HttpCode(200)
  async getNode(@Param('id') id: string) {
    try {
      return await this.nodesService.getNode({ nodeId: +id });
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

  @Post()
  @HttpCode(201)
  async createNode(@Body() payload: CreateNodeDto) {
    try {
      return await this.nodesService.createNode(payload);
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
  async updateNode(@Body() payload: UpdateNodeDto) {
    try {
      return await this.nodesService.updateNode(payload);
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
  async deleteNode(@Param('id') id: string) {
    try {
      return await this.nodesService.deleteNode(+id);
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
