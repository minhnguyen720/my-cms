import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(
    @GetCurrentUserId() userId,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.create(userId, createProjectDto);
  }

  @Get('dashboard-stat')
  async getDashboardStat(@GetCurrentUserId() userId: string) {
    return await this.projectService.getDashboardStat(userId);
  }

  @Get()
  async findAll(@GetCurrentUserId() userId: string) {
    return await this.projectService.findAll(userId);
  }

  @Put('active/toggle')
  async toggleActive(
    @GetCurrentUserId() userId: string,
    @Body() body: { id: string; value: boolean },
  ) {
    return await this.projectService.toggleActive(userId, body);
  }

  @Put('remove')
  async removeSelection(
    @GetCurrentUserId() userId: string,
    @Body() body: { ids: string[] },
  ) {
    return await this.projectService.removeSelection(userId, body.ids);
  }
}
