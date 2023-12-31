import { Injectable, Logger } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from 'src/schemas/project.schema';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as dayjs from 'dayjs';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  private readonly logger = new Logger(Project.name);
  private readonly perPage: number = 2;

  async getProjectById(id: string) {
    try {
      this.logger.log('Get project by ID');

      const project = await this.projectModel.findById(id);
      if (project === null) {
        this.logger.error(`Project ${id} not found`);
        return null;
      }
      return project;
    } catch (error) {
      this.logger.error('Fail to get project by ID');
      return null;
    }
  }

  async create(userId: string, createProjectDto: CreateProjectDto) {
    await this.projectModel.create({
      owner: userId,
      users: [userId],
      createdUser: userId,
      updatedUser: userId,
      createdDate: dayjs().toDate(),
      updatedDate: dayjs().toDate(),
      ...createProjectDto,
    });
  }

  async getDashboardStat(userId: string) {
    return Promise.all([
      this.projectModel.find({ active: true, users: userId }),
      this.projectModel.find({ active: false, users: userId }),
      this.getProjectsByUserId(userId),
    ]).then((values) => {
      const [activeLength, deactiveLength, projects] = values;
      return {
        activeLength: activeLength === null ? 0 : activeLength.length,
        deactiveLength: deactiveLength === null ? 0 : deactiveLength.length,
        projects,
      };
    });
  }

  async getDataByPage(perPage: number, page: number, userId: string) {
    try {
      const projects = await this.projectModel
        .find({
          users: userId,
        })
        .sort({
          createdDate: -1,
        })
        .limit(perPage)
        .skip(perPage * (page - 1));

      const formatedProjects = this.formatProjectData(projects);

      return {
        isSuccess: true,
        projects: formatedProjects,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        isSuccess: false,
      };
    }
  }

  async getProjectsByUserId(userId: string) {
    const result = await this.projectModel
      .find({ users: userId })
      .sort({
        createdDate: -1,
      })
      .limit(this.perPage);
    return this.formatProjectData(result);
  }

  async getTotalProject(userId: string) {
    const result = await this.projectModel
      .find({ users: userId })
      .countDocuments();
    return result;
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
