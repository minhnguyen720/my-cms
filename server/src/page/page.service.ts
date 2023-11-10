import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from 'src/schemas/page.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Schema } from 'mongoose';
import { Project } from 'src/schemas/project.schema';
import * as dayjs from 'dayjs';
import { MoveToTrashDto } from './dto/movetotrash.dto';
import { Users } from 'src/schemas/users.schema';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<Page>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Users.name) private userModel: Model<Users>,
  ) {}

  async findPageBelongToProject(projectId: string) {
    try {
      const pages = await this.pageModel
        .find({
          project: projectId,
          isRemove: false,
        })
        .populate('createdUser', null, Users.name)
        .populate('updatedUser', null, Users.name)
        .exec();
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

  async create(userId: string, createPageDto: CreatePageDto) {
    try {
      const user = await this.userModel.findOne({
        id: userId,
      });
      await this.pageModel.create({
        ...createPageDto,
        isRemove: false,
        createdUser: user._id,
        updatedUser: user._id,
        createdDate: dayjs().toString(),
        updatedDate: dayjs().toString(),
      });
      const projectRes = await this.findPageBelongToProject(
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

  async moveToTrash(body: MoveToTrashDto) {
    try {
      await this.pageModel.findByIdAndUpdate(body.pageId, { isRemove: true });
      const newDatasource = await this.pageModel.find({
        project: body.projectId,
        isRemove: false,
      });

      return {
        isSuccess: true,
        newDatasource,
      };
    } catch (error) {
      return {
        isSucces: false,
      };
    }
  }
}
