import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { PlayersService } from '../../database/players/players.service';
import { Player } from '@codeblitz/data/dist/entities/Player';
import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';

class FindAllQueryParams {
  @ApiPropertyOptional() username?: string;
  @ApiPropertyOptional() name?: string;
}

@ApiTags('players')
@Controller('api/players')
export class PlayersController {
  @Inject() private readonly players!: PlayersService;

  @Get()
  async findAll(
    @Query() queries: FindAllQueryParams
  ): Promise<Player[]> {
    return await this.players.search(queries);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Player> {
    return await this.players.findById(id);
  }
}
