import { Controller, Delete, Get, Inject, Param, Put, Query } from '@nestjs/common';
import { PlayersService } from '../../database/players/players.service';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
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

  @Get('me')
  async findCurrentPlayer(): Promise<Player> {
    return new Player() //TODO: req.user
  }

  @Get(':id')
  async findById(@Param('id') playerId: number): Promise<Player> {
    return await this.players.findById(playerId);
  }

  @Get(':id/followers')
  async findFollowersOf(@Param('id') playerId: number): Promise<Player[]> {
    return await this.players.findFollowers(playerId)
  }

  @Get(':id/following')
  async findFollowedBy(@Param('id') playerId: number): Promise<Player[]> {
    return await this.players.findFollowing(playerId)
  }

  @Put(':id/follow')
  async followPlayer(@Param('id') playerId: number): Promise<boolean> {
    return true // TODO
  }

  @Delete(':id/follow')
  async unfollowPlayer(@Param('id') playerId: number): Promise<boolean> {
    return true // TODO
  }
}
