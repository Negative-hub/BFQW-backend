import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Get,
} from '@nestjs/common';
import { UserService } from '@/users/user.service';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/models')
  @HttpCode(200)
  async getModels(@Param('id') id: string) {
    try {
      return this.userService.getAllModels(+id);
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
