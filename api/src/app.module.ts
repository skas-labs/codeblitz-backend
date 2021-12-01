import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { GameModule } from './game/game.module';
import { QuestionsModule } from './questions/questions.module';
import { DatabaseModule } from './database/database.module';
import { RouterModule } from 'nest-router';
import { appRouter } from './app.router';
import { AuthModule } from './auth/auth.module';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [
    // router
    // RouterModule.forRoutes(appRouter),
    // apis
    PlayersModule, GameModule, QuestionsModule,
    RegistrationModule,
    //auth
    AuthModule,
    // database
    DatabaseModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {
}
