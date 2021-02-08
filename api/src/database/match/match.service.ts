import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../database.provider';
import { Lazy } from '../../utils/lazy.decorator';
import { MatchRequestRepository } from '@codeblitz/data/dist/repositories/matchRequest.repository';
import { Player } from '@codeblitz/data/dist/entities/player.entity';
import { MatchRequest } from '@codeblitz/data/dist/entities/match.entity';

@Injectable()
export class MatchService {
  @Inject() private readonly database!: Database;

  @Lazy<MatchService>(c => c.database.repos.matchRequest)
  private repo!: MatchRequestRepository;

  async createMatchRequest(player: Player): Promise<MatchRequest> {
    const match = await this.repo.createRequest(player)
    return match
  }


}
