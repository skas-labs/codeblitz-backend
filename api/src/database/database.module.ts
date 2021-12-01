import { Global, Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { PlayersService } from './players/players.service';
import { UsersService } from './users/users.service';
import { MatchService } from './match/match.service';
import { RegistrationService } from './registration/registration.service';

@Global()
@Module({
  providers: [ databaseProvider, PlayersService, UsersService, MatchService,RegistrationService ],
  exports: [ PlayersService, UsersService, MatchService,RegistrationService ],

})
export class DatabaseModule {
}
