import { connect } from '@codeblitz/data';
import inquirer from 'inquirer'
import { seedQuestions } from './data/questions.seed';
import { seedUsers } from './data/users.seed';

async function seedData() {
  const { force }  = await inquirer.prompt<{force: boolean}>({
    type: 'confirm', name: 'force', message: 'Drop Database?'
  })
  const db = await connect('seed', force)

  await seedQuestions(db.repositories.question)
  await seedUsers(db.repositories.user)
}

seedData()