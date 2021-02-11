import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { UsersService } from '../../database/users/users.service';
import { User } from '@codeblitz/data/dist/entities/user.entity';
import { LoginGuard } from '../../auth/guards/login.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseGuards(LoginGuard)
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
