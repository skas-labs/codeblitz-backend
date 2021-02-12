import { Injectable } from '@nestjs/common';
import { connect, Repositories } from '@codeblitz/data';

@Injectable()
export abstract class Database {
  repos!: Repositories;

  async connectDb(): Promise<void> {
    const store = await connect('game-engine');
    this.repos = store.repositories;
  }

}

class DevDatabase extends Database {
}

class ProdDatabase extends Database {
}

export const databaseProvider = {
  provide: Database,
  useClass: process.env.NODE_ENV === 'development' ? DevDatabase : ProdDatabase
};