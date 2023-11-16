import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from 'src/schemas/project.schema';
import { Model, Schema, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as dayjs from 'dayjs';
import { TrashService } from 'src/trash/trash.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private readonly trashService: TrashService,
  ) {}

  async getProjectById(id) {
    return await this.projectModel.findById(id);
  }

  async create(userId: string, createProjectDto: CreateProjectDto) {
    await this.projectModel.create({
      owner: userId,
      users: [userId],
      createdUser: userId,
      updatedUser: userId,
      createdDate: dayjs().toString(),
      updatedDate: dayjs().toString(),
      ...createProjectDto,
    });
  }

  async getDashboardStat(userId: string) {
    return Promise.all([
      this.projectModel.find({ active: true, users: userId }).count().exec(),
      this.projectModel.find({ active: false, users: userId }).count().exec(),
      this.getProjectsByUserId(userId),
    ]).then((values) => {
      const [activeLength, deactiveLength, projects] = values;
      return { activeLength, deactiveLength, projects };
    });
  }

  async getProjectsByUserId(userId: string) {
    const result = await this.projectModel.find({ users: userId });
    return this.formatProjectData(result);
  }

  async toggleActive(userId: string, body: { id: string; value: boolean }) {
    try {
      await this.projectModel.findByIdAndUpdate(body.id, {
        active: body.value,
      });
      const { activeLength, deactiveLength } = await this.getDashboardStat(
        userId,
      );
      return {
        success: true,
        activeLength,
        deactiveLength,
      };
    } catch (error) {
      return { success: false };
    }
  }

  async findAll(userId: string) {
    const result = await this.getProjectsByUserId(userId);
    return { projects: result };
  }

  async findMany(projectIds: string[]) {
    return await this.projectModel.find({ _id: { $in: projectIds } });
  }

  formatProjectData(
    projects: (Document<unknown, object, Project> &
      Project &
      Required<{
        _id: Schema.Types.ObjectId;
      }>)[],
  ) {
    return projects.map((project) => {
      return {
        id: project._id,
        label: project.name,
        href: `/application/project/${project._id}`,
        createdDate: project.createdDate,
        updatedDate: project.updatedDate,
        active: project.active,
      };
    });
  }
}
