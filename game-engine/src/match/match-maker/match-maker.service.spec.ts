import { Test, TestingModule } from '@nestjs/testing';
import { MatchMakerService } from './match-maker.service';

describe('MatchMakerService', () => {
  let service: MatchMakerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchMakerService],
    }).compile();

    service = module.get<MatchMakerService>(MatchMakerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
