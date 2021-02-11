import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { LoginGuard } from '../../auth/guards/login.guard';
import { PlayersService } from '../../database/players/players.service';
import { GetUser } from '../../auth/decorators/getuser.decorator';
import { User } from '@codeblitz/data/dist/entities/user.entity';
import { MatchService } from '../../database/match/match.service';

class MatchCreatedResponse {
  @ApiProperty({required: true, example: '1ee7cb89-7465-4872-914f-783a06911927'})
  @IsUUID()
  id!: string
}


@ApiTags('matches')
@ApiBearerAuth()
@Controller('matches')
@UseGuards(LoginGuard)
export class MatchreqController {
  @Inject() private readonly players!: PlayersService
  @Inject() private readonly matches!: MatchService

  @ApiResponse({type: MatchCreatedResponse})
  @Post('/')
  async createMatch(@GetUser() user: User): Promise<MatchCreatedResponse> {
    const player = await this.players.findByUser(user)
    const match = await this.matches.createMatchRequest(player)
    return match
  }
}
