import { Repositories } from '@codeblitz/data';
import { Player } from '@codeblitz/data/dist/entities/Player';

export async function getPlayerById(id: number): Promise<Player> {
  return await Repositories.player.findById(id)
}