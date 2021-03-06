import { MatchRequestRepository } from '@codeblitz/data/dist/repositories/matchRequest.repository'
import { PlayerRepository } from '@codeblitz/data/dist/repositories/player.repository'

/** @internal */
export async function seedMatchRequests(repo: MatchRequestRepository, playerRepo: PlayerRepository) {
  const player1 = await playerRepo.findByUsername('championswimmer');
  const player2 = await playerRepo.findByUsername('testplayerb');

  const matchRequests = ([
    await repo.createRequest(player1[0]),
    await repo.createRequest(player2[0])
  ])

  for (const q of matchRequests) {
    console.log('inserted', q);
  }
}

