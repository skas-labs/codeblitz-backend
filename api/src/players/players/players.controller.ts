import { Controller, Delete, Get, Inject, Logger, Param, Put, Query, UseGuards } from '@nestjs/common';
import { PlayersService } from '../../database/players/players.service';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { ApiBearerAuth, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { LoginGuard } from '../../auth/guards/login.guard';
import { GetUser } from '../../auth/decorators/getuser.decorator';
import { User } from '@codeblitz/data/dist/entities/user.entity';

class FindAllQueryParams {
  @ApiPropertyOptional() username?: string;
  @ApiPropertyOptional() name?: string;
}

@ApiBearerAuth()
@ApiTags('players')
@Controller('players')
@UseGuards(LoginGuard)
export class PlayersController {
  @Inject() private readonly players!: PlayersService;

  @Get()
  async findAll(
    @Query() queries: FindAllQueryParams
  ): Promise<Player[]> {
    return await this.players.search(queries);
  }

  @Get('me')
  async findCurrentPlayer(@GetUser() user: User): Promise<Player> {
    return await this.players.findByUser(user);
  }

  @Get(':id')
  async findById(@Param('id') playerId: number): Promise<Player> {
    return await this.players.findById(playerId);
  }

  @Get(':id/followers')
  async findFollowersOf(@Param('id') playerId: number): Promise<Player[]> {
    return await this.players.findFollowers(playerId);
  }

  @Get(':id/following')
  async findFollowedBy(@Param('id') playerId: number): Promise<Player[]> {
    return await this.players.findFollowing(playerId);
  }

  @Put(':id/follow')
  async followPlayer(@Param('id') playerId: number): Promise<boolean> {
    return true; // TODO
  }

  @Delete(':id/follow')
  async unfollowPlayer(@Param('id') playerId: number): Promise<boolean> {
    return true; // TODO
  }
}
