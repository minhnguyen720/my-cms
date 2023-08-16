import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from 'src/schemas/project.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
  }

  async getDashboardStat() {
    const activeLength = await this.projectModel
      .find({ active: true })
      .count()
      .exec();
    const deactiveLength = await this.projectModel
      .find({ active: false })
      .count()
      .exec();
    return { activeLength, deactiveLength };
  }

  findAll() {
    return this.projectModel.find();
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
