import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from 'src/schemas/project.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import dayjs from 'dayjs';

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
      const mappedProjects = projects.map((project) => {
        return {
          id: project._id,
          label: project.name,
          href: `/project/${project._id}`,
          createdDate: project.createdDate,
          updatedDate: project.updatedDate,
        };
      });
      return { activeLength, deactiveLength, projects: mappedProjects };
    });
  }

  async findAll() {
    const result = await this.projectModel.find();
    const mappedProjects = result.map((project) => {
      return {
        id: project._id,
        label: project.name,
        href: `/project/${project._id}`,
        createdDate: project.createdDate,
        updatedDate: project.updatedDate,
      };
    });
    return { projects: mappedProjects };
  }

  findOne(id: string) {
    return this.projectModel.findById({ _id: id }).exec();
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
