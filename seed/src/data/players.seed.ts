import { PlayerRepository } from '@codeblitz/data/dist/repositories/player.repository';
import { UserRepository } from '@codeblitz/data/dist/repositories/user.repository';
import { Player } from '@codeblitz/data/dist/entities/player.entity';

/** @internal */
export async function seedPlayers(repo: PlayerRepository, userRepo: UserRepository) {
  const players = ([
    await createPlayer(repo, userRepo, '+918800233266', 'championswimmer', 'Arnav Gupta'),
    await createPlayer(repo, userRepo, '+918888877777', 'testplayerb', 'Test PlayerB'),
    await createPlayer(repo, userRepo, '+919999955555', 'testplayerc', 'Test PlayerC'),
  ]);

  await repo.followPlayer(players[0], players[1]);
  await repo.followPlayer(players[1], players[2]);
  await repo.followPlayer(players[1], players[0]);
  await repo.followPlayer(players[2], players[0]);

  const allPlayers = await repo.findAll();

  for (const p of allPlayers) {
    console.log(p);
  }
}

async function createPlayer(
  repo: PlayerRepository,
  userRepo: UserRepository,
  phno: string,
  username: string,
  name: string
) {
  const user = await userRepo.findByPhNo(phno);
  const player = new Player();
  player.user = user;
  player.username = username;
  player.name = name;
  player.isBot = false;
  return await repo.createPlayer(player);
}