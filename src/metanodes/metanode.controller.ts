import {
  Controller,
  HttpCode,
  HttpException,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { MetanodeService } from '@/metanodes/metanode.service';
import { CreateMetanodeDto } from '@/metanodes/dto/CreateMetanodeDto';
import { UpdateMetanodeDto } from '@/metanodes/dto/UpdateMetanodeDto';
import { ErrorResponse } from '@/types/general';

@Controller('/api/metanodes')
export class MetanodeController {
  constructor(private readonly metanodeService: MetanodeService) {}

  @Post()
  @HttpCode(201)
  async createMetanode(@Body() payload: CreateMetanodeDto) {
    try {
      return await this.metanodeService.createMetanode(payload);
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
  async updateMetanode(@Body() payload: UpdateMetanodeDto) {
    try {
      return await this.metanodeService.updateMetanode(payload);
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
  async deleteMetanode(@Param('id') id: string) {
    try {
      return await this.metanodeService.deleteMetanode(+id);
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
