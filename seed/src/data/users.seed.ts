import {UserRepository } from '@codeblitz/data/dist/repositories/user.repository';


/** @internal */
export async function seedUsers(repo: UserRepository) {

  const users = await Promise.all([
    repo.createUser({emailid: 'a@cb.lk', phno: '+918800233266'}),
    repo.createUser({emailid: 'b@cb.lk', phno: '+918888877777'}),
    repo.createUser({emailid: 'c@cb.lk', phno: '+919999955555'})
  ])

  for (const u of users) {
    console.log(u)
  }
}