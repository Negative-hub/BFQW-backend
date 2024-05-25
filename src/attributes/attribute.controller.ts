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
import { AttributeService } from '@/attributes/attribute.service';
import { CreateAttributeDto } from '@/attributes/dto/CreateAttributeDto';
import { UpdateAttributeDto } from '@/attributes/dto/UpdateAttributeDto';
import { ErrorResponse } from '@/types/general';

@Controller('/api/attributes')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post()
  @HttpCode(201)
  async createAttribute(@Body() payload: CreateAttributeDto) {
    try {
      return await this.attributeService.createAttribute(payload);
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
  async updateAttribute(@Body() payload: UpdateAttributeDto) {
    try {
      return await this.attributeService.updateAttribute(payload);
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
  async deleteAttribute(@Param('id') id: string) {
    try {
      return await this.attributeService.deleteAttribute(+id);
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
