import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { TrashService } from './trash.service';
import { RestoreDto } from './dto/restore.dto';

@Controller('trash')
export class TrashController {
  constructor(private readonly trashService: TrashService) {}

  @Get(':projectId/:type')
  async getTrashDataByType(
    @Param('type') type: string,
    @Param('projectId') projectId: string,
  ) {
    return await this.trashService.getTrashDataByType(type, projectId);
  }

  @Put('empty')
  async empty() {
    return await this.trashService.empty();
  }

  @Put('restore')
  async restore(@Body() body: RestoreDto) {
    return await this.trashService.restore(body);
  }
}
