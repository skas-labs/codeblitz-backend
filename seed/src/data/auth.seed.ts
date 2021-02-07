import { AuthtokenRepository } from '@codeblitz/data/dist/repositories/authtoken.repository';
import { UserRepository } from '@codeblitz/data/dist/repositories/user.repository';

/** @internal */
export async function seedAuth(repo: AuthtokenRepository, userRepo: UserRepository) {
  const user1 = await userRepo.findById(1);
  const user2 = await userRepo.findById(2);

  const tokens = ([
    await repo.createToken(user1, '105c840c-f4c8-4c6b-a8f8-f326d4012d63'),
    await repo.createToken(user1, '1923bdc9-a465-4eb3-8b48-c2fd78a53dc3'),
    await repo.createToken(user2, '2a38f0ca-b967-4c6e-b243-6e96e0e86e6e')
  ])
  tokens.forEach(t => {
    console.log(t)
  })
}