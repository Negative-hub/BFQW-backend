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
  Query,
} from '@nestjs/common';
import { CreateNodeDto } from '@/nodes/dto/CreateNodeDto';
import { NodeService } from '@/nodes/node.service';
import { UpdateNodeDto } from '@/nodes/dto/UpdateNodeDto';
import { GetMetanodeDto } from '@/nodes/dto/GetMetanodeDto';

@Controller('/api/nodes')
export class NodeController {
  constructor(private readonly nodesService: NodeService) {}

  @Get('/metanode')
  @HttpCode(200)
  async getMetanodeById(@Query() params: GetMetanodeDto) {
    console.log(12421421);
    try {
      return this.nodesService.getMetanodeById({ nodeIds: params.nodeIds });
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

  @Get('/:id')
  @HttpCode(200)
  async getNode(@Param('id') id: string) {
    console.log(123);
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

  @Post()
  @HttpCode(201)
  async createNode(@Body() payload: CreateNodeDto) {
    console.log(1233);
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

  @Patch(':id')
  @HttpCode(200)
  async updateNode(@Body() payload: UpdateNodeDto) {
    console.log(12353);
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
