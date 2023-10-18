import {
  Controller,
  Get,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get('dashboard-stat')
  async getDashboardStat() {
    return await this.projectService.getDashboardStat();
  }

  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }

  @Put('active/toggle')
  async toggleActive(@Body() body: { id: string; value: boolean }) {
    return await this.projectService.toggleActive(body);
  }

  @Put('remove')
  async removeSelection(@Body() body: { ids: string[] }) {
    return await this.projectService.removeSelection(body.ids);
  }
}
