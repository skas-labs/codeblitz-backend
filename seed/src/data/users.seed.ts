import { UserRepository } from '@codeblitz/data/dist/repositories/user.repository';


export async function seedUsers(repo: UserRepository) {

  const users = await Promise.all([
    repo.createUser({email: 'a@cb.lk', phno: '+918800233266'})
  ])

  for (const u of users) {
    console.log(u)
  }
}