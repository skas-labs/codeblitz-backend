import { AbstractRepository, EntityRepository } from "typeorm";
import { MatchRequest } from "../entities/match.entity";
import { Player } from "../entities/player.entity";

export class MatchRequestNotFoundError extends Error {
  name = 'MATCH_REQUEST_NOT_FOUND';
}

@EntityRepository(MatchRequest)
export class MatchRequestRepository extends AbstractRepository<MatchRequest> {
  async findByUuid(uuid: string): Promise<MatchRequest> {
    const matchRequest = await this.repository.findOne(uuid, {
      relations: ['player']
    });
    if (!matchRequest) throw new MatchRequestNotFoundError();
    return matchRequest;
  }

  async createRequest(player: Player): Promise<MatchRequest> {
    const matchRequest = new MatchRequest();
    matchRequest.player = player;

    return this.repository.save(matchRequest);
  }
}
