import { Routes } from 'nest-router';
import { PlayersModule } from './players/players.module';
import { GameModule } from './game/game.module';
import { QuestionsModule } from './questions/questions.module';
import { AuthModule } from './auth/auth.module';
import { RegistrationModule } from './registration/registration.module';

/**
 * NOTE: We are not using this right now !
 */

export const appRouter: Routes = [
  {
    path: '/api',
    children: [
      {
        path: '/players',
        module: PlayersModule
      },
      {
        path: '/game',
        module: GameModule
      },
      {
        path: '/questions',
        module: QuestionsModule
      }
    ]
  },
  {
    path: '/auth',
    module: AuthModule
  },
  {
    path: '/registration',
    module: RegistrationModule
  }
]