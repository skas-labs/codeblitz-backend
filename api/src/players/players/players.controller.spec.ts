import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { DatabaseModule } from '../../database/database.module';

describe('PlayersController', () => {
  let controller: PlayersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ PlayersController ],
      imports: [ DatabaseModule ]
    }).compile();

    controller = await module.get<PlayersController>(PlayersController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });
});
