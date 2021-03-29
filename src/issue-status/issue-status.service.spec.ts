import { Test, TestingModule } from '@nestjs/testing';
import { IssueStatusService } from './issue-status.service';

describe('IssueStatusService', () => {
  let service: IssueStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssueStatusService],
    }).compile();

    service = module.get<IssueStatusService>(IssueStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
