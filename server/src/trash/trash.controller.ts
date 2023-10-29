import { Body, Controller } from '@nestjs/common';
import { TrashService } from './trash.service';

@Controller('trash')
export class TrashController {
  constructor(private readonly trashService: TrashService) {}

  @Put('empty')
  async empty(@Body() body: string[]) {
    return await this.trashService.empty(body);
  }
}
