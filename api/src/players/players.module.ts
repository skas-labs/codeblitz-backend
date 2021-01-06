import { Module } from '@nestjs/common';
import { PlayersController } from './players/players.controller';
import { UsersController } from './users/users.controller';

@Module({
  controllers: [ PlayersController, UsersController ],
})
export class PlayersModule {
}
