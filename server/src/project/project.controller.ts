import { Controller, Get, Post, Body, Put, Param, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetCurrentUserId } from 'src/common/decorators';
import { TrashService } from 'src/trash/trash.service';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly trashService: TrashService,
  ) {}

  // Static routes
  @Get()
  async findAll(@GetCurrentUserId() userId: string) {
    return await this.projectService.findAll(userId);
  }

  @Get('pg')
  async getDataByPage(
    @GetCurrentUserId() userId: string,
    @Query('perPage') perPage: string,
    @Query('page') page: string,
  ) {
    const perPageNum = parseInt(perPage, 10);
    const pageNum = parseInt(page, 10);
    return await this.projectService.getDataByPage(perPageNum, pageNum, userId);
  }

  @Get('dashboard-stat')
  async getDashboardStat(@GetCurrentUserId() userId: string) {
    return await this.projectService.getDashboardStat(userId);
  }

  @Get('total')
  async getTotal(@GetCurrentUserId() userId: string) {
    return await this.projectService.getTotalProject(userId);
  }

  @Post()
  async create(
    @GetCurrentUserId() userId: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.create(userId, createProjectDto);
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
    const projects = await this.projectService.findMany(body.ids);
    await this.trashService.handleDeleteProjects(projects);
    return await this.projectService.findAll(userId);
  }

  // Dynamic routes
  @Get(':id')
  async getProjectById(@Param('id') id: string) {
    return await this.projectService.getProjectById(id);
  }
}
