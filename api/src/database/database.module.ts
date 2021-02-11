import { Global, Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { PlayersService } from './players/players.service';
import { UsersService } from './users/users.service';
import { MatchService } from './match/match.service';

@Global()
@Module({
  providers: [ databaseProvider, PlayersService, UsersService, MatchService, ],
  exports: [ PlayersService, UsersService, MatchService, ],

})
export class DatabaseModule {
}
