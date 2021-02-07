import { connect } from '@codeblitz/data';
import inquirer from 'inquirer'
import { seedQuestions } from './data/questions.seed';
import { seedUsers } from './data/users.seed';
import { seedPlayers } from './data/players.seed';
import { seedMatchRequests } from './data/matchRequests.seed';
import { seedAuth } from './data/auth.seed';

async function seedData() {
  const { force }  = await inquirer.prompt<{force: boolean}>({
    type: 'confirm', name: 'force', message: 'Drop Database?'
  })
  const db = await connect('seed', force)

  const { q } = await inquirer.prompt<{q: boolean}>([ {type: 'confirm', name: 'q', message: 'Seed Questions?'}])
  if (q) await seedQuestions(db.repositories.question)

  const { u } = await inquirer.prompt<{u: boolean}>([ {type: 'confirm', name: 'u', message: 'Seed Users?'}])
  if (u) await seedUsers(db.repositories.user)

  const { p } = await inquirer.prompt<{p: boolean}>([ {type: 'confirm', name: 'p', message: 'Seed Players?'}])
  if (p) await seedPlayers(db.repositories.player, db.repositories.user)

  const { mr } = await inquirer.prompt<{mr: boolean}>([ {type: 'confirm', name: 'mr', message: 'Seed Match Requests?'}])
  if (mr) await seedMatchRequests(db.repositories.matchRequest, db.repositories.player)

  const { a } = await inquirer.prompt<{a: boolean}>([ {type: 'confirm', name: 'a', message: 'Seed Auth Tokens?'}])
  if (a) await seedAuth(db.repositories.auth, db.repositories.user)

  await db.connection.close()

}

seedData()