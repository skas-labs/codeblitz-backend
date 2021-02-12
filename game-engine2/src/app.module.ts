import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { MatchModule } from './match/match.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';
import { DatabaseModule } from './database/database.module';
import { databaseProvider } from './database/database.provider';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "../public"),
    }),
    GameModule,
    MatchModule,
    DatabaseModule
  ],
  providers: [AppService, databaseProvider],
})
export class AppModule {}
