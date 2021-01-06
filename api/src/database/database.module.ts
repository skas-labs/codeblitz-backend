import { Global, Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { PlayersService } from './players/players.service';
import { UsersService } from './users/users.service';

@Global()
@Module({
  providers: [ databaseProvider, PlayersService, UsersService, ],
  exports: [ PlayersService ]
})
export class DatabaseModule {
}
