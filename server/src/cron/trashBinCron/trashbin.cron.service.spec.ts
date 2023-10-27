import { Test, TestingModule } from '@nestjs/testing';
import { TrashbinCronService } from './trashbin.cron.service';

describe('CronService', () => {
  let service: TrashbinCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrashbinCronService],
    }).compile();

    service = module.get<TrashbinCronService>(TrashbinCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
