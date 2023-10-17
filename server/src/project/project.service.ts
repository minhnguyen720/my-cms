import { HttpException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from 'src/schemas/project.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    await this.projectModel.create(createProjectDto);
  }

  async getDashboardStat() {
    return Promise.all([
      this.projectModel.find({ active: true }).count().exec(),
      this.projectModel.find({ active: false }).count().exec(),
      this.projectModel.find(),
    ]).then((values) => {
      const [activeLength, deactiveLength, projects] = values;
      const mappedProjects = this.formatProjectData(projects);
      return { activeLength, deactiveLength, projects: mappedProjects };
    });
  }

  async toggleActive(body: { id: string; value: boolean }) {
    try {
      await this.projectModel.findByIdAndUpdate(body.id, {
        active: body.value,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async findAll() {
    const result = await this.projectModel.find();
    const mappedProjects = this.formatProjectData(result);
    return { projects: mappedProjects };
  }

  async removeSelection(ids: string[]) {
    try {
      await this.projectModel.deleteMany({ _id: { $in: ids } });
      const updatedProjectList = await this.projectModel.find();
      return this.formatProjectData(updatedProjectList);
    } catch (error) {
      const updatedProjectList = await this.projectModel.find();
      return this.formatProjectData(updatedProjectList);
    }
  }

  formatProjectData(
    projects: (Document<unknown, {}, Project> &
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
