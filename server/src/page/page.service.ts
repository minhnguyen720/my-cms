import { HttpStatus, Injectable } from '@nestjs/common';
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
      const project = await this.projectModel.findOne({ id: projectId });
      return project;
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
        id: createPageDto.project,
      });
      const newPageData = await this.pageModel.create({
        ...createPageDto,
        project: projectRes._id.toString(),
      });
      projectRes.pages.push(newPageData);
      await projectRes.save();
      return { success: true, message: '', newProjectData: projectRes };
    } catch (error) {
      return {
        success: false,
        message: HttpStatus.INTERNAL_SERVER_ERROR,
      };
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

  async remove(deleteData: { projectId: string; pageId: string }) {
    try {
      const { projectId, pageId } = deleteData;
      // const projectRes = await this.projectModel.findById(projectId);
      // projectRes.pages.splice(
      //   projectRes.pages.findIndex((e) => e.id === pageId),
      //   1,
      // );
      // await projectRes.save();

      // await this.pageModel.deleteOne({
      //   id: pageId,
      // });

      Promise.all([
        this.projectModel.findById(projectId),
        this.pageModel.deleteOne({
          id: pageId,
        }),
      ]).then(async (values) => {
        const [projectRes] = values;
        projectRes.pages.splice(
          projectRes.pages.findIndex((e) => e.id === pageId),
          1,
        );
        await projectRes.save();
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
