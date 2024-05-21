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
import { MetanodeService } from '@/metanodes/metanode.service';
import { CreateMetanodeDto } from '@/metanodes/dto/CreateMetanodeDto';
import { UpdateMetanodeDto } from '@/metanodes/dto/UpdateMetanodeDto';

@Controller('/api/metanodes')
export class MetanodeController {
  constructor(private readonly metanodeService: MetanodeService) {}

  @Post()
  @HttpCode(201)
  async createMetanode(@Body() payload: CreateMetanodeDto) {
    try {
      return this.metanodeService.createMetanode(payload);
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
  async updateMetanode(@Body() payload: UpdateMetanodeDto) {
    try {
      return this.metanodeService.updateMetanode(payload);
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
  async deleteMetanode(@Param('id') id: string) {
    try {
      return this.metanodeService.deleteMetanode(+id);
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
