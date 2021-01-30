import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UsersService } from '../../database/users/users.service';
import { User } from '@codeblitz/data/dist/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('players', 'users')
@Controller('api/users')
export class UsersController {
  @Inject() private readonly users!: UsersService

  @Get()
  async findAll() : Promise<User[]> {
    return await this.users.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return await this.users.findById(id)
  }
}
