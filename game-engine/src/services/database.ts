import { Repositories, connect } from '@codeblitz/data';

class DatabaseService {
  repos: Repositories;

  async initialize() {
    const store = await connect('game-engine');
    this.repos = store.repositories;
  }

}

export default new DatabaseService();
