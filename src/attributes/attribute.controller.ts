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
import { AttributeService } from '@/attributes/attribute.service';
import { CreateAttributeDto } from '@/attributes/dto/CreateAttributeDto';
import { UpdateAttributeDto } from '@/attributes/dto/UpdateAttributeDto';

@Controller('/api/attributes')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post()
  @HttpCode(201)
  async createAttribute(@Body() payload: CreateAttributeDto) {
    try {
      return this.attributeService.createAttribute(payload);
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
  async updateAttribute(@Body() payload: UpdateAttributeDto) {
    try {
      return this.attributeService.updateAttribute(payload);
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
  async deleteAttribute(@Param('id') id: string) {
    try {
      return this.attributeService.deleteAttribute(+id);
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
