import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from 'src/schemas/project.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as dayjs from 'dayjs';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    await this.projectModel.create({
      createdDate: dayjs().toString(),
      updatedDate: dayjs().toString(),
      ...createProjectDto,
    });
  }

  async getDashboardStat() {
    return Promise.all([
      this.projectModel.find({ active: true }).count().exec(),
      this.projectModel.find({ active: false }).count().exec(),
      this.getProjectsByUserId(),
    ]).then((values) => {
      const [activeLength, deactiveLength, projects] = values;
      return { activeLength, deactiveLength, projects };
    });
  }

  async getProjectsByUserId() {
    const result = await this.projectModel.find({ isRemove: false });
    return this.formatProjectData(result);
  }

  async toggleActive(body: { id: string; value: boolean }) {
    try {
      await this.projectModel.findByIdAndUpdate(body.id, {
        active: body.value,
      });
      const { activeLength, deactiveLength } = await this.getDashboardStat();
      return {
        success: true,
        activeLength,
        deactiveLength,
      };
    } catch (error) {
      return { success: false };
    }
  }

  async findAll() {
    const result = await this.getProjectsByUserId();
    return { projects: result };
  }

  async removeSelection(ids: string[]) {
    try {
      // await this.projectModel.deleteMany({ _id: { $in: ids } });
      await this.projectModel.updateMany(
        { _id: { $in: ids } },
        { isRemove: true },
      );
      return await this.getProjectsByUserId();
    } catch (error) {
      return await this.getProjectsByUserId();
    }
  }

  formatProjectData(
    projects: (Document<unknown, any, Project> &
      Project & {
        _id: Types.ObjectId;
      })[],
  ) {
    return projects.map((project) => {
      return {
        id: project._id,
        label: project.name,
        href: `/project/${project._id}`,
        createdDate: project.createdDate,
        updatedDate: project.updatedDate,
        active: project.active,
      };
    });
  }
}
