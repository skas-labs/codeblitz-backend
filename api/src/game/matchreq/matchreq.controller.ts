import { Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

@ApiResponse({})
export class MatchCreatedResponse {
  @ApiProperty({required: true, example: '1ee7cb89-7465-4872-914f-783a06911927'})
  @IsUUID()
  matchId: string

  constructor(matchId: string) {
    this.matchId = matchId;
  }
}
@Controller('game/match')
export class MatchreqController {
  @Post('/')
  async createMatch(): Promise<MatchCreatedResponse> {
    return new MatchCreatedResponse('1ee7cb89-7465-4872-914f-783a06911927');
  }
}
