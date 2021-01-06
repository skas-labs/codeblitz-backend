import { Controller, Get, Inject, Param } from '@nestjs/common';
import { PlayersService } from '../../database/players/players.service';
import { Player } from '@codeblitz/data/dist/entities/Player';

@Controller('api/players')
export class PlayersController {
  @Inject() private readonly players!: PlayersService

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Player> {
    return await this.players.findById(id)
  }
}
