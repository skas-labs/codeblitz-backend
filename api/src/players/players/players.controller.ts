import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { PlayersService } from '../../database/players/players.service';
import { Player } from '@codeblitz/data/dist/entities/Player';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('players')
@Controller('api/players')
export class PlayersController {
  @Inject() private readonly players!: PlayersService

  @Get()
  async findAll(
    @Query('username') username?: string,
    @Query('name') name?: string
  ): Promise<Player[]> {
    return await this.players.search({ username, name })
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Player> {
    return await this.players.findById(id)
  }
}
