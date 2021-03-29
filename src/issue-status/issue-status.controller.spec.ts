import { Test, TestingModule } from '@nestjs/testing';
import { IssueStatusController } from './issue-status.controller';

describe('IssueStatusController', () => {
  let controller: IssueStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssueStatusController],
    }).compile();

    controller = module.get<IssueStatusController>(IssueStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
