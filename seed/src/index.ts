import { connect } from '@codeblitz/data';
import inquirer from 'inquirer';
import { seedQuestions } from './data/questions.seed';
import { seedUsers } from './data/users.seed';
import { seedPlayers } from './data/players.seed';
import { seedMatchRequests } from './data/matchRequests.seed';
import { seedAuth } from './data/auth.seed';

async function q(seed: string, seedFn: () => Promise<void>) {
  await inquirer.prompt<{ [x: string]: boolean }>({
    type: 'confirm', name: seed, message: `Seed ${ seed } ?`
  }).then(async (ans) => {
      if (ans[seed]) return await seedFn();
    }
  );
}

async function seedData() {
  const {force} = await inquirer.prompt<{ force: boolean }>({
    type: 'confirm', name: 'force', message: 'Drop Database?'
  });
  const db = await connect('seed', force);

  await q('Questions', () => seedQuestions(db.repositories.question));
  await q('Users', () => seedUsers(db.repositories.user));
  await q('Players', () => seedPlayers(db.repositories.player, db.repositories.user));
  await q(
    'Match Requests',
    () => seedMatchRequests(db.repositories.matchRequest, db.repositories.player)
  );
  await q('Auth', () => seedAuth(db.repositories.auth, db.repositories.user));

  await db.connection.close();

}

seedData();