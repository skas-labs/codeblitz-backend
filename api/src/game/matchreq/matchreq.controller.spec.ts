import { Test, TestingModule } from '@nestjs/testing';
import { MatchreqController } from './matchreq.controller';

describe('MatchreqController', () => {
  let controller: MatchreqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchreqController],
    }).compile();

    controller = module.get<MatchreqController>(MatchreqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
