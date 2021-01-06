import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { GameModule } from './game/game.module';
import { QuestionsModule } from './questions/questions.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ PlayersModule, GameModule, QuestionsModule, DatabaseModule ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {
}
