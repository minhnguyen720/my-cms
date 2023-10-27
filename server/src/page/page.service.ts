import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from 'src/schemas/page.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/schemas/project.schema';
import * as dayjs from 'dayjs';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<Page>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async findPageBelongToProject(projectId: string) {
    try {
      // const project = await this.projectModel.findById(projectId);
      const pages = await this.pageModel.find({
        project: projectId,
      });
      return pages;
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error,
      };
    }
  }

  async updateStatus(body: { id: string; value: boolean; projectId: string }) {
    try {
      await this.pageModel.findByIdAndUpdate(body.id, { active: body.value });
      const newData = await this.findPageBelongToProject(body.projectId);
      return {
        isSuccess: true,
        latest: newData,
      };
    } catch (error) {
      return false;
    }
  }

  async create(createPageDto: CreatePageDto) {
    try {
      await this.pageModel.create({
        ...createPageDto,
        isRemove: false,
        createdDate: dayjs().toString(), // use date of server not user local date
        updatedDate: dayjs().toString(), // use date of server not user local date
      });
      const projectRes = await this.projectModel.findById(
        createPageDto.project,
      );

      return { success: true, message: '', newProjectData: projectRes };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  findAll() {
    return `This action returns all page`;
  }

  async findOne(id: string) {
    return await this.pageModel.findById(id);
  }

  async remove(deleteData: { projectId: string; pageId: string }) {
    try {
      const { projectId, pageId } = deleteData;
      Promise.all([
        this.projectModel.findById(projectId),
        this.pageModel.deleteOne({
          id: pageId,
        }),
      ]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async moveToTrash(body) {
    try {
      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSucces: false,
      };
    }
  }
}
