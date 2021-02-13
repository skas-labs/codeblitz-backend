import { Test, TestingModule } from '@nestjs/testing';
import { CombinedGateway } from './combined.gateway';

describe('CombinedGateway', () => {
  let gateway: CombinedGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombinedGateway],
    }).compile();

    gateway = module.get<CombinedGateway>(CombinedGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
