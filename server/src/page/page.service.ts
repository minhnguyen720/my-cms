import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from 'src/schemas/page.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/schemas/project.schema';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<Page>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async findPageBelongToProject(projectId: string) {
    try {
      return await this.pageModel.find({ project: projectId });
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error,
      };
    }
  }

  async create(createPageDto: CreatePageDto) {
    try {
      const projectRes = await this.projectModel.findOne({
        id: createPageDto.id,
      });
      const body = {
        ...createPageDto,
        project: projectRes._id,
      };
      const page = await this.pageModel.create(body);
      projectRes.pages.push(page);
      projectRes.save();
      return { success: true };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Fail to create new page',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all page`;
  }

  findOne(id: number) {
    return `This action returns a #${id} page`;
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    return `This action updates a #${id} page`;
  }

  remove(id: number) {
    return `This action removes a #${id} page`;
  }
}
