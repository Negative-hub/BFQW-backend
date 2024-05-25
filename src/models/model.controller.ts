import {
  Post,
  Delete,
  Body,
  Controller,
  HttpCode,
  HttpException,
  Param,
  Get,
} from '@nestjs/common';
import { ModelService } from '@/models/model.service';
import { CreateModelDto } from '@/models/dto/CreateModelDto';
import { ErrorResponse } from '@/types/general';

@Controller('/api/models')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get()
  async getModels() {
    try {
      return await this.modelService.getModels();
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

  @Get(':id/nodes')
  @HttpCode(200)
  async getNodes(@Param('id') id: string) {
    try {
      return await this.modelService.getNodes(+id);
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

  @Get(':id/metanodes')
  @HttpCode(200)
  async getMetanodes(@Param('id') id: string) {
    try {
      return await this.modelService.getMetanodes(+id);
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

  @Get(':id/edges')
  @HttpCode(200)
  async getEdges(@Param('id') id: string) {
    try {
      return await this.modelService.getEdges(+id);
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

  @Get(':id/attributes')
  @HttpCode(200)
  async getAttributes(@Param('id') id: string) {
    try {
      return await this.modelService.getAttributes(+id);
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
  async createModel(@Body() payload: CreateModelDto) {
    try {
      return await this.modelService.createModel(payload);
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
  async deleteModel(@Param('id') id: string) {
    try {
      return await this.modelService.deleteModel(+id);
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
