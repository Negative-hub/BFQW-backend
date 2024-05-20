import {
  Post,
  Delete,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Get,
} from '@nestjs/common';
import { ModelService } from '@/models/model.service';
import { CreateModelDto } from '@/models/dto/CreateModelDto';

@Controller('/api/models')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get(':id/metanodes')
  @HttpCode(200)
  async getMetanodesByModel(@Param('id') id: string) {
    try {
      return this.modelService.getMetanodesByModel(+id);
    } catch (e) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Возникла непредвиденная ошибка',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Post()
  @HttpCode(201)
  async createModel(@Body() payload: CreateModelDto) {
    try {
      return this.modelService.createModel(payload);
    } catch (e) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Возникла непредвиденная ошибка ',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteModel(@Param('id') id: string) {
    try {
      return this.modelService.deleteModel(+id);
    } catch (e) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Возникла непредвиденная ошибка',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
