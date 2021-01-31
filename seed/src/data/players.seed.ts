import { PlayerRepository } from '@codeblitz/data/dist/repositories/player.repository';
import { UserRepository } from '@codeblitz/data/dist/repositories/user.repository';
import { Player } from '@codeblitz/data/dist/entities/player.entity';

export async function seedPlayers(repo: PlayerRepository, userRepo: UserRepository) {
  const players = await Promise.all([
    createPlayer(repo, userRepo, '+918800233266', 'championswimmer', 'Arnav Gupta'),
    createPlayer(repo, userRepo, '+918888877777', 'testplayerb', 'Test PlayerB'),
    createPlayer(repo, userRepo, '+919999955555', 'testplayerc', 'Test PlayerC'),
  ])

  for (const p of players) {
    console.log(p)
  }
}

async function createPlayer(
  repo: PlayerRepository,
  userRepo: UserRepository,
  phno: string,
  username: string,
  name: string
) {
  const user = await userRepo.findByPhNo(phno)
  const player = new Player()
  player.user = user
  player.username = username
  player.name = name
  player.isBot = false
  return await repo.createPlayer(player)
}